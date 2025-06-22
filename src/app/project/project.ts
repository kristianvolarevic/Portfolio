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
  showVideo = false; // TRUE = video in left sidebar, FALSE = video in gallery
  imageHeight = 'auto'; // Logo image always 'auto' for aspect ratio
  currentIndex = -1;
  canNavigatePrevious: boolean = true;
  canNavigateNext: boolean = true;

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
        console.log('NavigationEnd event detected. Loading project data...');
        this.loadProjectData();
      });

    this.loadProjectData();
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    console.log('ngAfterViewInit: View elements are ready.');

    if (this.project) {
      this.scheduleLayoutCheck();
    }
  }

  ngAfterViewChecked() {
    if (this.needsLayoutUpdate) {
      console.log('ngAfterViewChecked: needsLayoutUpdate triggered.');
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
            console.log(
              'loadProjectData: View initialized, scheduling layout check...'
            );
            this.scheduleLayoutCheck();
          } else {
            console.log(
              'loadProjectData: View not yet initialized, ngAfterViewInit will schedule.'
            );
          }
        } else {
          console.warn(`Project with title "${this.projectTitle}" not found.`);
        }
      } else {
        console.log(
          `Project "${this.projectTitle}" already loaded, no change in ID.`
        );
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
      console.warn(
        'scheduleLayoutCheck: Elements not ready, rescheduling initial check...'
      );
      this.currentLayoutAnimationFrameId = requestAnimationFrame(() =>
        this.scheduleLayoutCheck()
      );
      return;
    }

    console.log(
      'scheduleLayoutCheck: Elements confirmed ready. Starting stable height check...'
    );
    this.currentLayoutAnimationFrameId = requestAnimationFrame(() =>
      this.checkStableLayout()
    );
  }

  private checkStableLayout() {
    if (!this.projectRightElement || !this.projectLeftElement) {
      console.warn(
        'checkStableLayout: Elements disappeared or not initialized. Stopping check.'
      );
      this.currentLayoutAnimationFrameId = null;
      return;
    }

    const currentRightHeight =
      this.projectRightElement.nativeElement.offsetHeight;

    if (currentRightHeight === this.lastRightHeight && currentRightHeight > 0) {
      this.stableLayoutCheckCount++;
      console.log(
        `Height stable count: ${this.stableLayoutCheckCount} / ${this.maxStableChecks}. Current Height: ${currentRightHeight}`
      );
    } else {
      this.stableLayoutCheckCount = 0;
      console.log(
        `Height changed or zero. Resetting stable count. New Height: ${currentRightHeight}`
      );
    }

    this.lastRightHeight = currentRightHeight;

    if (
      this.stableLayoutCheckCount >= this.maxStableChecks ||
      (currentRightHeight === 0 && this.stableLayoutCheckCount > 0)
    ) {
      console.log(
        'Layout appears stable or consistently zero. Proceeding with determineContentLayout.'
      );
      this.currentLayoutAnimationFrameId = null;

      // Image check is still relevant here for the logo in the left panel.
      const logoImg =
        this.projectLeftElement.nativeElement.querySelector('img');
      if (logoImg && !logoImg.complete) {
        console.log('Logo image not yet complete. Waiting for load...');
        logoImg.onload = () => {
          console.log('Logo image loaded. Final layout determination.');
          this.determineContentLayout();
          this.cdr.detectChanges();
          this.setupMutationObserver();
        };
        logoImg.onerror = () => {
          console.error(
            'Logo image failed to load. Proceeding with layout determination as fallback.'
          );
          this.determineContentLayout();
          this.cdr.detectChanges();
          this.setupMutationObserver();
        };
      } else {
        console.log(
          'No logo image or already complete. Final layout determination.'
        );
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
    if (!this.projectRightElement || !this.projectLeftElement) {
      console.warn('MutationObserver setup failed: elements not available.');
      return;
    }

    this.cleanupObserver();

    this.observer = new MutationObserver(() => {
      console.log(
        'MutationObserver: DOM change detected in right element. Scheduling layout check.'
      );
      // When mutation occurs, re-trigger the full layout check
      requestAnimationFrame(() => this.scheduleLayoutCheck());
    });

    this.observer.observe(this.projectRightElement.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
    console.log('MutationObserver setup and observing projectRightElement.');
  }

  private cleanupObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      console.log('MutationObserver disconnected.');
    }
  }

  // --- Crucial Logic Change Here ---
  determineContentLayout() {
    if (
      !this.projectRightElement ||
      !this.projectLeftElement ||
      (this.projectRightElement.nativeElement.offsetHeight === 0 &&
        this.lastRightHeight === 0) ||
      this.projectLeftElement.nativeElement.offsetHeight === 0
    ) {
      console.warn(
        'determineContentLayout: Elements or their heights are not ready. Skipping.'
      );
      return;
    }

    const rightHeight = this.projectRightElement.nativeElement.offsetHeight;
    console.log(`Current Right Element Height for decision: ${rightHeight}px`);

    // Define the threshold for when the right sidebar is "big enough"
    // If rightHeight is below this, the video moves to the gallery.
    // YOU WILL NEED TO TUNE THIS VALUE BASED ON YOUR DESIGN AND VIDEO HEIGHT.
    const thresholdForVideoInLeft = 700; // Example: if right is less than 700px, move video

    const shouldVideoStayInLeft = rightHeight >= thresholdForVideoInLeft;

    if (this.showVideo !== shouldVideoStayInLeft) {
      this.showVideo = shouldVideoStayInLeft;
      console.log(
        `Layout decision: showVideo changed to ${this.showVideo} (rightHeight: ${rightHeight}px, threshold: ${thresholdForVideoInLeft}px).`
      );
    }

    // The image height is set to 'auto' as per your CSS.
    // It remains in project-left regardless of showVideo.
    this.imageHeight = 'auto'; // Keep auto for aspect ratio
    console.log(`Image height set to: ${this.imageHeight}.`);
  }
  // --- End of Crucial Logic Change ---

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
