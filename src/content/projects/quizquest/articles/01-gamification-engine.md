# Gamification Engine

QuizQuest's engagement loop is built on three interlocking systems: XP, streaks, and ranks. Each plays a different role in driving different learner behaviors.

## XP

Experience points are the primary reward currency. Every completed lesson module awards XP based on type and performance:

| Activity | Base XP |
|---|---|
| Reading module completed | 10 |
| Quiz passed (first attempt) | 25 |
| Quiz passed (second attempt) | 15 |
| Code challenge solved | 40 |
| Code challenge solved without hints | 60 |

Performance multipliers apply on top of base XP. A perfect quiz score gets a 1.5× multiplier. Solving a code challenge in under half the average time gets a 2× multiplier. These multipliers reward mastery, not just completion.

## Streaks

A streak is maintained when a learner completes at least one lesson module on consecutive calendar days. Missing a day resets the streak to zero.

Streaks drive daily return behavior. A learner who has built a 14-day streak has a strong incentive to complete at least one module today — even a short reading module — to protect it. This "streak protection" motivation is intentional.

A "streak freeze" feature lets learners bank one missed day per seven-day streak. This prevents a single missed day from destroying weeks of progress, which would be demotivating enough to cause churn.

## Ranks

Ranks are milestone markers based on cumulative XP. They're non-reversible — once earned, a rank is permanent regardless of future activity. The rank ladder:

`RECRUIT → OPERATOR → SPECIALIST → ENGINEER → ARCHITECT → MASTER`

Rank unlocks cosmetic rewards in the UI — badge display changes, profile accent color options, and access to a "Master Track" course category. The functional rewards are minimal; the rank is primarily a status signal.

![QuizQuest demo view](/assets/images/projects/quizquest/quizquest-demo.png)
