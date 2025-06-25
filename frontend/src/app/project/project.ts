import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';

import { PROJECTS } from '../models/projects';
import { Project as ProjectModel } from '../models/project';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './project.html',
  styleUrl: './project.css',
  encapsulation: ViewEncapsulation.None,
})
export class Project
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  projectTitle: string | null = null;
  project: ProjectModel | null = null;

  showVideo = false;
  imageHeight = 'auto';
  currentIndex = -1;

  canNavigatePrevious = true;
  canNavigateNext = true;

  private needsLayoutUpdate = false;
  private viewInitialized = false;

  @ViewChild('projectRightElement') projectRightElement!: ElementRef;
  @ViewChild('projectLeftElement') projectLeftElement!: ElementRef;

  private observer: MutationObserver | null = null;
  private routerSubscription: any;
  private currentLayoutAnimationFrameId: number | null = null;
  private stableLayoutCheckCount = 0;
  private lastRightHeight = 0;
  private maxStableChecks = 5;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadProjectData();
      });

    this.loadProjectData();
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    if (this.project) {
      this.scheduleLayoutCheck();
    }
  }

  ngAfterViewChecked() {
    if (this.needsLayoutUpdate) {
      this.determineContentLayout();
      this.needsLayoutUpdate = false;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.cleanupObserver();

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.currentLayoutAnimationFrameId !== null) {
      cancelAnimationFrame(this.currentLayoutAnimationFrameId);
      this.currentLayoutAnimationFrameId = null;
    }
  }

  private loadProjectData() {
    this.route.paramMap.subscribe((params) => {
      const newProjectTitle = params.get('id');

      if (this.projectTitle !== newProjectTitle) {
        this.projectTitle = newProjectTitle;
        this.project =
          PROJECTS.find((p) => p.title === this.projectTitle) || null;

        if (this.project) {
          this.currentIndex = PROJECTS.findIndex(
            (p) => p.title === this.projectTitle
          );
          this.updateNavigationButtons();
          this.cleanupObserver();

          if (this.viewInitialized) {
            this.scheduleLayoutCheck();
          }
        }
      }
    });
  }

  private scheduleLayoutCheck() {
    if (this.currentLayoutAnimationFrameId !== null) {
      cancelAnimationFrame(this.currentLayoutAnimationFrameId);
      this.currentLayoutAnimationFrameId = null;
    }

    this.stableLayoutCheckCount = 0;
    this.lastRightHeight = 0;

    if (
      !this.viewInitialized ||
      !this.projectRightElement ||
      !this.projectLeftElement
    ) {
      this.currentLayoutAnimationFrameId = requestAnimationFrame(() =>
        this.scheduleLayoutCheck()
      );
      return;
    }

    this.currentLayoutAnimationFrameId = requestAnimationFrame(() =>
      this.checkStableLayout()
    );
  }

  private checkStableLayout() {
    if (!this.projectRightElement || !this.projectLeftElement) {
      this.currentLayoutAnimationFrameId = null;
      return;
    }

    const currentRightHeight =
      this.projectRightElement.nativeElement.offsetHeight;

    if (currentRightHeight === this.lastRightHeight && currentRightHeight > 0) {
      this.stableLayoutCheckCount++;
    } else {
      this.stableLayoutCheckCount = 0;
    }

    this.lastRightHeight = currentRightHeight;

    if (
      this.stableLayoutCheckCount >= this.maxStableChecks ||
      (currentRightHeight === 0 && this.stableLayoutCheckCount > 0)
    ) {
      this.currentLayoutAnimationFrameId = null;

      const logoImg =
        this.projectLeftElement.nativeElement.querySelector('img');

      if (logoImg && !logoImg.complete) {
        logoImg.onload = () => {
          this.determineContentLayout();
          this.cdr.detectChanges();
          this.setupMutationObserver();
        };
        logoImg.onerror = () => {
          this.determineContentLayout();
          this.cdr.detectChanges();
          this.setupMutationObserver();
        };
      } else {
        this.determineContentLayout();
        this.cdr.detectChanges();
        this.setupMutationObserver();
      }
    } else {
      this.currentLayoutAnimationFrameId = requestAnimationFrame(() =>
        this.checkStableLayout()
      );
    }
  }

  private setupMutationObserver() {
    if (!this.projectRightElement) return;

    this.cleanupObserver();

    this.observer = new MutationObserver(() => {
      requestAnimationFrame(() => this.scheduleLayoutCheck());
    });

    this.observer.observe(this.projectRightElement.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  private cleanupObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  determineContentLayout() {
    if (
      !this.projectRightElement ||
      !this.projectLeftElement ||
      (this.projectRightElement.nativeElement.offsetHeight === 0 &&
        this.lastRightHeight === 0) ||
      this.projectLeftElement.nativeElement.offsetHeight === 0
    ) {
      return;
    }

    const rightHeight = this.projectRightElement.nativeElement.offsetHeight;
    const thresholdForVideoInLeft = 700;

    const shouldVideoStayInLeft = rightHeight >= thresholdForVideoInLeft;

    if (this.showVideo !== shouldVideoStayInLeft) {
      this.showVideo = shouldVideoStayInLeft;
    }

    this.imageHeight = 'auto';
  }

  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  private updateNavigationButtons() {
    this.canNavigatePrevious = this.currentIndex > 0;
    this.canNavigateNext = this.currentIndex < PROJECTS.length - 1;
  }

  clickPrevious() {
    if (this.canNavigatePrevious) {
      const previousProject = PROJECTS[this.currentIndex - 1];
      this.router.navigate(['/projects', previousProject.title]);
    }
  }

  clickNext() {
    if (this.canNavigateNext) {
      const nextProject = PROJECTS[this.currentIndex + 1];
      this.router.navigate(['/projects', nextProject.title]);
    }
  }
}
