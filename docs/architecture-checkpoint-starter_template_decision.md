# Checkpoint — Décision du starter template

Contexte projet (web_app, greenfield, complexité faible, back‑office interne) et UX (shadcn/ui + Radix, Dark par défaut) suggèrent un starter moderne Next.js avec typage strict, auth et ORM intégrés.

Options évaluées:
1) Create T3 App — recommandé
   - Décisions fournies: Next.js, TypeScript, tRPC, Prisma, NextAuth, Tailwind
   - Bénéfice: base full‑stack typée, conventions solides pour éviter les divergences entre agents
   - Commande (générique):
```bash
npm create t3-app@latest nozobrain
```
   - À sélectionner dans l’assistant: TypeScript, App Router, Tailwind, Prisma, NextAuth, shadcn/ui (ajout ultérieur)

2) Create Next App
   - Décisions fournies: Next.js, TypeScript, App Router, Tailwind (option)
   - Moins « batteries‑incluses » (ORM/Auth à ajouter manuellement)
   - Commande (générique):
```bash
npx create-next-app@latest nozobrain --typescript --tailwind --app
```

3) From scratch (manuelle)
   - Flexibilité totale, mais toutes les décisions doivent être explicitées et alignées

Recommandation:
- Utiliser Create T3 App pour sécuriser: typage bout‑en‑bout (tRPC), ORM (Prisma), Auth (NextAuth), Tailwind. Aligné avec nos besoins (RBAC, API interne, performances, A11y).

Question:
Souhaitez‑vous utiliser Create T3 App comme fondation ? [y/n]

━━━━━━━━━━━━━━━━━━━━━━━
Options:
- [a] Advanced Elicitation (explorer alternatives/contraintes spécifiques)
- [c] Continuer
- [p] Party‑Mode (impliquer d’autres agents)
- [y] YOLO


