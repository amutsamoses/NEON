ALTER TABLE "orders" DROP COLUMN IF EXISTS "estimated_delivery_time";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "actual_delivery_time";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";