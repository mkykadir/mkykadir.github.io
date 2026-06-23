document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Toggle theme function
    themeToggle.addEventListener('click', function () {
        var savedTheme = localStorage.getItem('theme');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        var newTheme;
        if (savedTheme) {
            // If there's a pinned theme, toggle back to system default (null)
            newTheme = null;
            localStorage.removeItem('theme');
        } else {
            // If currently in system default, toggle to the OPPOSITE of the system theme
            newTheme = systemDark ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
        }
        
        // Apply the active theme
        var activeTheme = newTheme || (systemDark ? 'dark' : 'light');
        
        if (activeTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        
        // Update color-scheme meta tag
        var metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.content = newTheme ? newTheme : 'light dark';
        }
    });

    // Listen for system changes to match when no user preference is set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
        }
    });
});
