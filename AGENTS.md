<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- App state is React context (src/lib/store.tsx) with sample data in src/lib/data.ts, persisted only to this browser via src/lib/persist.ts (loaded in useEffect to stay SSR-safe); no backend, so auth/AI/chat/calls/live/payouts stay demo-labelled.
- Brand logo is swapped via LOGO_URL in src/lib/brand.ts so the owner's original logo is used unchanged.
