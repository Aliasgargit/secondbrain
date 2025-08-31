import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contents: any[] = [];
  type: string = 'all';

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'] || 'all';
      this.fetchContent();
    });
  }

  fetchContent() {
    this.contentService.getContent().subscribe((res: any) => {
      this.contents = this.type === 'all' 
        ? res.data 
        : res.data.filter((c: any) => c.type === this.type);
    });
  }

  deleteContent(id: string) {
    this.contentService.deleteContent(id).subscribe(() => this.fetchContent());
  }

  openAddContentDialog() {
    // Open Angular Material Dialog to add new content
  }
}
