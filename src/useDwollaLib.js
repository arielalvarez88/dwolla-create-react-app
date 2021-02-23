import { useCallback, useEffect, useState } from "react";

export const useLoadDwollaLib = ({
  success,
  error,
  tokenUrl = `localhost:4444/dwolla/token`,
  environment = 'sandbox',
}) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [errorLoadingScript, setErrorLoadingScript] = useState(
    null
  );
  const [dwollaScriptLoaded, setDwollaScriptLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setDwollaScriptLoaded(true);
  }, [setDwollaScriptLoaded]);
  const onErrorLoadingScript = useCallback(() => {
    setErrorLoadingScript(
      new Error("Error loading dwolla script from external cdn")
    );
  }, [setErrorLoadingScript]);

  //TODO In case we need to include other 3rd library party we can take this code and move it to it's own hook.
  const loadDwollaScript = useCallback(() => {
    const existingScript = document.getElementById("dwolla-components-lib");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//cdn.dwolla.com/v2/dwolla-web.js";
      script.id = "dwolla-components-lib";
      script.type = "text/javascript";
      document.body.appendChild(script);
      script.onload = onLoad;
      script.onerror = onErrorLoadingScript;
    // eslint-disable-next-line no-undef
    } else if (!dwolla) {
      // TODO test if this works
      existingScript.onload = onLoad;
    } else {
      // The script is already loaded
      setDwollaScriptLoaded(true);
    }
  }, [onLoad]);

  useEffect(() => {
    loadDwollaScript();
  }, [loadDwollaScript]);

  useEffect(() => {
    if (!dwollaScriptLoaded) {
      return;
    }
    if (!isConfigured) {
      // eslint-disable-next-line no-undef
      dwolla.configure({
        environment,
        tokenUrl,
        success,
        error,
      });
    }

    setIsConfigured(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured, setIsConfigured, dwollaScriptLoaded]);

  return {
    ready: dwollaScriptLoaded && isConfigured,
    error: errorLoadingScript,
  };
};
