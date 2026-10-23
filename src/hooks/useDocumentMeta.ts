import { useEffect } from 'react';

const DEFAULT_TITLE = document.title;
const descriptionTag = () => document.querySelector<HTMLMetaElement>('meta[name="description"]');
const DEFAULT_DESCRIPTION = descriptionTag()?.content ?? '';

/** Sets the page title / description for the current route and restores them on leave. */
export function useDocumentMeta(title?: string, description?: string): void {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE;
    const tag = descriptionTag();
    if (tag) tag.content = description ?? DEFAULT_DESCRIPTION;
    return () => {
      document.title = DEFAULT_TITLE;
      if (tag) tag.content = DEFAULT_DESCRIPTION;
    };
  }, [title, description]);
}
