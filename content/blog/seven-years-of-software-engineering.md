---
title: What Seven Years of Software Engineering Taught Me
description: Lessons from the road between my first internship commit and designing multi-tenant systems — most of them learned the hard way.
date: 2026-06-10
category: Career
tags: [career, lessons, engineering-culture]
featured: true
---

Seven years ago I pushed my first commit to a production repository and immediately broke the staging environment. Nobody shouted. A senior engineer sat with me, we fixed it together, and he said something I still repeat to juniors today: "Good. Now you know this system better than anyone who hasn't broken it."

Here is what the years since have taught me.

## Code is the easy part

Early on, I believed engineering skill meant knowing more syntax, more frameworks, more patterns. What actually limited me was everything around the code: understanding what the client meant rather than what they said, estimating honestly, writing down decisions, and knowing when to say "this is not worth building."

The projects that failed around me rarely failed for technical reasons. They failed because nobody agreed on what "done" meant.

## Boring technology is a feature

At InventuriX I once argued for a newer, more exciting stack on a client project. My lead chose the boring option — the one the whole team already knew. The project shipped on time, and maintenance was cheap for years.

I now apply a simple rule: spend your innovation budget where the product actually needs it, and choose boring everywhere else. A railway ticketing platform does not need an experimental database. It needs to sell tickets at 6 a.m. without incident.

## Production teaches what tutorials cannot

Working on the railway platform at Pelican Cube changed how I think about software. When your RabbitMQ consumer misbehaves, real passengers feel it. You learn to ask questions tutorials never raise:

- What happens when this message is delivered twice?
- What happens when it is never delivered?
- Who gets paged, and what will they see?

Designing for failure is not pessimism. It is respect for the people using the system.

## Refactoring is a negotiation, not a purge

I used to see legacy code as an enemy. Now I see it as a record of decisions that made sense at the time. The refactoring work I'm proudest of — untangling message-driven services without downtime — succeeded because we moved in small, reversible steps and kept the old paths alive until the new ones proved themselves.

Rewrite-from-scratch is occasionally right. It is usually a way to trade known problems for unknown ones.

## Mentoring is leverage

The highest-leverage hours of my week were never my own tickets. They were the thirty minutes spent unblocking a junior developer who then moved faster for months. Teaching also sharpens your own understanding — nothing exposes a fuzzy mental model like trying to explain it.

## Take care of the person doing the engineering

Somewhere in year four I learned that sustained output comes from sustainable pace. The heroic all-nighter produces worse code than the well-rested morning. I stopped treating exhaustion as commitment.

---

If I could send one line back to myself in 2019, it would be this: **the career compounds through curiosity and consistency, not through any single big break.** Show up, stay curious, break things carefully, and fix what you break.
