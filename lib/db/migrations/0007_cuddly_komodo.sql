ALTER TABLE "contact_submissions" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "website" varchar(500);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "service_interest" varchar(255);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "location" varchar(255);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "form_type" varchar(50);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "price" varchar(100);--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "source_page_url" varchar(500);