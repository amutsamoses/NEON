ALTER TABLE "auth_tokens" ADD COLUMN "username" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_tokens" DROP COLUMN IF EXISTS "token";