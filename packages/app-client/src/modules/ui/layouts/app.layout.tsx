import { authStore } from '@/modules/auth/auth.store';
import { buildTimeConfig } from '@/modules/config/config.constants';
import { getConfig } from '@/modules/config/config.provider';
import { buildDocUrl } from '@/modules/docs/docs.models';
import { useI18n } from '@/modules/i18n/i18n.provider';
import { useNoteContext } from '@/modules/notes/notes.context';
import { cn } from '@/modules/shared/style/cn';
import { useThemeStore } from '@/modules/theme/theme.store';
import { Button } from '@/modules/ui/components/button';
import { DropdownMenu } from '@kobalte/core/dropdown-menu';

import { A, useNavigate } from '@solidjs/router';
import { type Component, type ParentComponent, Show } from 'solid-js';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../components/dropdown-menu';

const ThemeSwitcher: Component = () => {
  const themeStore = useThemeStore();
  const { t } = useI18n();

  return (
    <>
      <DropdownMenuItem onClick={() => themeStore.setColorMode({ mode: 'light' })} class="flex items-center gap-2 cursor-pointer">
        <div class="i-tabler-sun text-lg"></div>
        {t('navbar.theme.light-mode')}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => themeStore.setColorMode({ mode: 'dark' })} class="flex items-center gap-2 cursor-pointer">
        <div class="i-tabler-moon text-lg"></div>
        {t('navbar.theme.dark-mode')}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => themeStore.setColorMode({ mode: 'system' })} class="flex items-center gap-2 cursor-pointer">
        <div class="i-tabler-device-laptop text-lg"></div>
        {t('navbar.theme.system-mode')}
      </DropdownMenuItem>
    </>
  );
};

const LanguageSwitcher: Component = () => {
  const { t, getLocale, setLocale, locales } = useI18n();
  const languageName = new Intl.DisplayNames(getLocale(), {
    type: 'language',
    languageDisplay: 'standard',
  });

  return (
    <>
      {locales.map(locale => (
        <DropdownMenuItem onClick={() => setLocale(locale.key)} class={cn('cursor-pointer', { 'font-bold': getLocale() === locale.key })}>
          <span translate="no" lang={getLocale() === locale.key ? undefined : locale.key}>
            {locale.name}
          </span>
          <Show when={getLocale() !== locale.key}>
            <span class="text-muted-foreground pl-1">
              (
              {languageName.of(locale.key)}
              )
            </span>
          </Show>
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator />

      <DropdownMenuItem as="a" class="flex items-center gap-2 cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://github.com/CorentinTh/enclosed/tree/main/packages/app-client/src/locales">
        {t('navbar.settings.contribute-to-i18n')}
        <div class="i-tabler-external-link text-lg text-muted-foreground"></div>
      </DropdownMenuItem>
    </>
  );
};

export const Navbar: Component = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const config = getConfig();
  const { isNoteView } = useNoteContext();

  const newNoteClicked = () => {
    navigate('/');
  };

  const getShouldShowNewNoteButton = () => config.isAuthenticationRequired ? authStore.getIsAuthenticated() : true;

  return (
    <nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 items-center">
        <div class="mr-4 hidden md:flex">
          <A class="mr-6 flex items-center space-x-2" href="/">
            <span class="hidden font-bold sm:inline-block">OpenScratch Note</span>
          </A>
        </div>

        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <Show when={!isNoteView() && getShouldShowNewNoteButton()}>
              <Button onClick={newNoteClicked} class="w-full md:w-auto">
                {t('navbar.new-note')}
              </Button>
            </Show>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" class="w-9 px-0">
                <div class="i-tabler-menu-2 h-6 w-6" />
                <span class="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <Show when={config.isAuthenticationRequired}>
                <Show
                  when={authStore.getIsAuthenticated()}
                  fallback={
                    <DropdownMenuItem asChild>
                      <A href="/login" class="cursor-pointer">
                        {t('navbar.login')}
                      </A>
                    </DropdownMenuItem>
                  }
                >
                  <DropdownMenuItem onClick={() => authStore.logout()} class="cursor-pointer">
                    {t('navbar.logout')}
                  </DropdownMenuItem>
                </Show>
                <DropdownMenuSeparator />
              </Show>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger class="flex items-center gap-2">
                  <div class="i-tabler-language text-lg" />
                  {t('navbar.language')}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <LanguageSwitcher />
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger class="flex items-center gap-2">
                  <div class="i-tabler-palette text-lg" />
                  {t('navbar.theme.title')}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <ThemeSwitcher />
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <A href={buildDocUrl()} target="_blank" class="flex items-center gap-2 cursor-pointer">
                  <div class="i-tabler-book text-lg" />
                  {t('navbar.documentation')}
                </A>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <A href="https://github.com/your-username/openscratch-note" target="_blank" class="flex items-center gap-2 cursor-pointer">
                  <div class="i-tabler-brand-github text-lg" />
                  GitHub
                </A>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export const Footer: Component = () => {
  const config = getConfig();
  const { t } = useI18n();

  return (
    <footer class="py-6 md:px-8 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t('footer.built-by')}{' '}
          <a href="https://github.com/your-username/openscratch-note" target="_blank" class="font-medium underline underline-offset-4">
            OpenScratch Team
          </a>
          . v{config.appVersion}
        </p>
      </div>
    </footer>
  );
};

export const AppLayout: ParentComponent = (props) => {
  const getIsSecureContext = () => {
    return window.isSecureContext ?? window.location.protocol === 'https:';
  };

  const { t } = useI18n();

  return (
    <div class="flex flex-col h-screen min-h-0">
      <Show when={!getIsSecureContext()}>
        <div class="bg-warning px-6 py-2 text-center gap-2 justify-center bg-op-20 text-warning text-pretty">
          <div class="i-tabler-alert-triangle text-base hidden lg:inline-block vertical-mid mr-2"></div>
          {t('insecureContextWarning.description')}
          {' '}
          <a href={buildDocUrl({ path: '/self-hosting/troubleshooting#why-do-i-see-a-warning-about-insecure-connexion' })} target="_blank" rel="noopener noreferrer" class="underline hover:text-primary transition">
            {t('insecureContextWarning.learn-more')}
          </a>
        </div>
      </Show>

      <Navbar />

      <div class="flex-1 pb-20 ">{props.children}</div>

      <Footer />

    </div>
  );
};
