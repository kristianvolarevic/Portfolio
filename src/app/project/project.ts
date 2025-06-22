import {
  AfterViewInit,
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
  imports: [NgStyle],
  templateUrl: './project.html',
  styleUrl: './project.css',
  encapsulation: ViewEncapsulation.None,
})
export class Project implements OnInit, AfterViewInit, OnDestroy {
  projectTitle: string | null = null;
  project: ProjectModel | null = null;
  showVideo = false;
  imageHeight = 'auto';
  currentIndex = -1;
  canNavigatePrevious: boolean = true;
  canNavigateNext: boolean = true;

  @ViewChild('projectRightElement') projectRightElement!: ElementRef;
  @ViewChild('projectLeftElement') projectLeftElement!: ElementRef;

  private observer: MutationObserver | null = null;
  private routerSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.projectTitle = params.get('id');
      this.project =
        PROJECTS.find((p) => p.title === this.projectTitle) || null;

      if (this.project) {
        this.currentIndex = PROJECTS.findIndex(
          (p) => p.title === this.projectTitle
        );
        this.updateNavigationButtons();

        this.cleanupObserver();
        Promise.resolve().then(() => {
          this.setupMutationObserver();
          this.determineContentLayout();
          this.cdr.detectChanges();
        });
      }
    });

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.project) {
          Promise.resolve().then(() => {
            this.setupMutationObserver();
            this.determineContentLayout();
            this.cdr.detectChanges();
          });
        }
      });
  }

  ngAfterViewInit() {
    if (this.project && this.projectRightElement && this.projectLeftElement) {
      this.setupMutationObserver();
      this.determineContentLayout();
      this.cdr.detectChanges();
    }

    const logoImg = this.projectLeftElement.nativeElement.querySelector('img');
    if (logoImg && !logoImg.complete) {
      logoImg.onload = () => {
        this.determineContentLayout();
        this.cdr.detectChanges();
      };
    }
  }

  ngOnDestroy() {
    this.cleanupObserver();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private setupMutationObserver() {
    if (!this.projectRightElement || !this.projectLeftElement) return;

    this.cleanupObserver();

    this.observer = new MutationObserver(() => {
      this.determineContentLayout();
      this.cdr.detectChanges();
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
    if (!this.projectRightElement || !this.projectLeftElement) return;

    const rightHeight = this.projectRightElement.nativeElement.offsetHeight;
    const leftHeight = this.projectLeftElement.nativeElement.offsetHeight;
    const tolerance = 100;

    const shouldShowVideo = leftHeight <= rightHeight + tolerance;

    if (this.showVideo !== shouldShowVideo) {
      this.showVideo = shouldShowVideo;
      this.cdr.detectChanges();
    }

    this.imageHeight = this.showVideo ? 'auto' : `${rightHeight}px`;
    this.cdr.detectChanges();
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
