set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "entries" (
  "entryId" serial NOT NULL,
  "typeId" integer NOT NULL,
  "userId" integer NOT NULL,
  "item" TEXT NOT NULL,
  "amount" DECIMAL NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
  CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "types" (
    "typeId" serial NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "types_pk" PRIMARY KEY ("typeId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("typeId") REFERENCES "types"("typeId");
ALTER TABLE "entries" ADD CONSTRAINT "entries_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
