import { useEffect } from "react";

const SUFFIX = "MovieExplorer";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX;
  }, [title]);
}
