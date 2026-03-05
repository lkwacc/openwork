import "./globals.css";
import { JetBrains_Mono, Sora } from "next/font/google";
import Script from "next/script";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata = {
  title: "Crow5 - 私有AI工具",
  description:
    "Crow5是基于OpenWork打造的私有AI工具，支持多租户、知识库和持续学习。",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${sora.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          id="posthog"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init rs ls wi ns us ts ss capture calculateEventProperties vs register register_once register_for_session unregister unregister_for_session gs getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fs ds createPersonProfile setInternalOrTestUser ps Qr opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hs debug M cs getPageViewId captureTraceFeedback captureTraceMetric Kr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.setUserConfig=function(){e._i.push([arguments[0],arguments[1],"init"])},e.initData=function(){if(e._i){var o=e._i.shift();if(o){var n=o[0],p=o[1],r=o[2];e.init(n,p,r)}}},e}(window,document,window.posthog||[]);`
          }}
        />
      </head>
      <body className="antialiased text-ink">
        {children}
      </body>
    </html>
  );
}
