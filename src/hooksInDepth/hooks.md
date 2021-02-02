useMemo is useful when a component consist of 2+ pieces and for one piece there's no need for heavy computation? so it can reredner quickly, but another piece requires heavy computations. The problem is this --> the second piece will slow down the serenader of the first easy one because all component is rerendering and to be re-rendere it has to do both easy and heavy computation again even when the results of the heavy computation did not change and the second piece doesn't have to be re-rendered

useMemo and useCallback are for performance optimization

memo function from React means that "as long as none of my properties have changed, don't serenader me"