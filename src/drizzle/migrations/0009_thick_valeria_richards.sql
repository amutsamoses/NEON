ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_tokens" ALTER COLUMN "password" SET NOT NULL;