import { useCallback, useEffect, useMemo, useState } from 'react';
import { mergeSearchParams } from '../utils/merge-params';
import { parsePath } from '../utils/parse-path';

export const LOCATION_CHANGE_EVENT = 'locationchange';

/**
 * Retrieves the current location information.
 */
function getLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: window.history.state,
  } as const;
}

const pushState = window.history.pushState.bind(window.history);
const replaceState = window.history.replaceState.bind(window.history);
/**
 * Navigates to a new URL and updates the browser's history.
 *
 * @param url - The URL to navigate to.
 * @param replace - Optional. Specifies whether to replace the current URL in the history stack.
 *                  If set to `true`, the current URL will be replaced instead of creating a new entry.
 */
export function navigate(url: string, replace = false) {
  const changeUrl = replace ? replaceState : pushState;
  const currLocation = getLocation();
  const [pathname, search] = url.split('?');

  const updatedSearch = mergeSearchParams(currLocation.search, search ?? '');

  changeUrl({}, '', `${pathname}?${updatedSearch}`);
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
}

/**
 * Custom hook for managing the current location in a React component.
 *
 * @returns The current location.
 */
export function useLocation() {
  const [location, setLocation] = useState(getLocation());

  useEffect(() => {
    function handleLocationChange() {
      setLocation(getLocation());
    }
    window.addEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);

    return () =>
      window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);
  }, [setLocation]);

  return location;
}

/**
 * Custom hook for managing search parameters in the URL.
 *
 * @param param - The name of the search parameter to manage.
 * @returns A tuple containing the current value of the search parameter and a function to update its value.
 */
export function useSearchParams(param: string) {
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setParam = useCallback(
    function (value: string) {
      searchParams.set(param, value);

      navigate(`${pathname}?${searchParams.toString()}`, true);
      window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
    },
    [param, pathname, searchParams]
  );

  return [searchParams.get(param) ?? '', setParam] as const;
}

/**
 * Extracts path parameters from the current URL.
 *
 * @param path - The path to extract parameters from. Defaults to the current window location pathname.
 * @param param - The specific parameter to extract. Optional.
 *
 * @returns If `param` is provided, returns the value of the specified parameter as a string or undefined.
 * If `param` is not provided, returns an object containing all the path parameters as key-value pairs.
 */
export function usePathParams<T extends string | undefined>(
  path: string = window.location.pathname,
  param?: T
): T extends string ? string | undefined : Record<string, string | undefined> {
  const { pathname } = useLocation();
  const params = parsePath(path, pathname);

  if (param) {
    return params[param] as T extends string ? string | undefined : never;
  }

  return params as T extends string
    ? never
    : Record<string, string | undefined>;
}
