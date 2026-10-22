# Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos.

## Requirements

### User

- **Email:** lily@funlearning.io
- **Name:** LiLy
- **Password:** 12345678 (hash with bcryptjs, 12 rounds)
- **isPro:** true
- **emailVerified:** current date

### Books

- Get Ready For Starters: https://online.flipbuilder.com/sdtta/dime/
- Get Ready For Movers: https://online.flipbuilder.com/sdtta/twqv/
- Get Ready For Flyers: https://online.flipbuilder.com/sdtta/rjdn/

Get info from the books and populate the fields accordingly.

### Units

After populated the books, starts seed data for units with book_id matching with the units of that book. 

### Vocabulary items

The item should be vocabulary extracted from the matching unit, with the correct unit_id. The list of each unit's vocabs could be retrieved through the unit itself or in the end of the book, there's a vocabbulary list for each unit.

### Unit Progress

Can be any progress example for now.