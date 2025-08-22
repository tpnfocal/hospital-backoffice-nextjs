import localFont from "next/font/local";

const KanitLight = localFont({
  weight: "300",
  src: "../../assets/fonts/Kanit-Light.woff2",
  display: "swap",
  variable: "--font-kanit-light",
});
const KanitRegular = localFont({
  weight: "400",
  src: "../../assets/fonts/Kanit-Regular.woff2",
  display: "swap",
  variable: "--font-kanit-regular",
});
const KanitMedium = localFont({
  weight: "500",
  src: "../../assets/fonts/Kanit-Medium.woff2",
  display: "swap",
  variable: "--font-kanit-medium",
});
const SukhumvitTadMaiSemiBold = localFont({
  src: "../../assets/fonts/sukhumvittadmai-semibold.woff2",
  display: "swap",
});
const SukhumvitTadMaiText = localFont({
  src: "../../assets/fonts/sukhumvittadmai-text.woff2",
});
const TrueTextOnlineBlack = localFont({
  src: "../../assets/fonts/True Text Online Black.woff2",
});
const TrueTextOnlineBold = localFont({
  src: "../../assets/fonts/True Text Online Bold.woff2",
});
const TrueTextOnlineExtraBold = localFont({
  src: "../../assets/fonts/True Text Online ExtraBold.woff2",
});
const TrueTextOnlineRegular = localFont({
  src: "../../assets/fonts/True Text Online Regular.woff2",
});

export {
  KanitLight as KanitLightTypography,
  KanitRegular as KanitRegularTypography,
  KanitMedium as KanitMediumTypography,
  SukhumvitTadMaiSemiBold as SukhumvitTadMaiSemiBoldTypography,
  SukhumvitTadMaiText as SukhumvitTadMaiTextTypography,
  TrueTextOnlineBlack as TrueTextOnlineBlackTypography,
  TrueTextOnlineBold as TrueTextOnlineBoldTypography,
  TrueTextOnlineExtraBold as TrueTextOnlineExtraBoldTypography,
  TrueTextOnlineRegular as TrueTextOnlineRegularTypography,
};
