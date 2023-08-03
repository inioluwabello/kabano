import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";

export const LeftPaneFooter = () => {

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const toggleTheme = (newTheme: string) => {
        localStorage.setItem('savedTheme', newTheme);
        dispatch(pageSlice.actions.setTheme(newTheme));
    };

    const toggleSidebar = (isVisible: boolean) => {
        dispatch(pageSlice.actions.setLeftPaneVisibility(isVisible));
    }

    return (
        <div className="left-pane-footer">
            <div className="theme-toggle text-center">
                <button className="switch-btn alt-text" onClick={() => toggleTheme('light')}>
                    <img src="/assets/icon-light.svg" alt="Light" />
                </button>

                <div
                    onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
                    className={`switch pointer ${theme === 'light' ? 'text-left' : 'text-right'}`} >
                    <div className="switch-knob"></div>
                </div>

                <button className="switch-btn alt-text" onClick={() => toggleTheme('dark')}>
                    <img src="/assets/icon-dark.svg" alt="Dark" />
                </button>
            </div>

            <button
                onClick={() => toggleSidebar(false)}
                className="hide-sidebar-btn pointer alt-text">
                <img src="/assets/idon-hide-sidebar.svg" alt="Hide" />{" "}
                Hide Sidebar
            </button>
        </div>
    )
}