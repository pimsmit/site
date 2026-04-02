"use client";

import { useEffect, useState } from "react";

const localeToCurrency: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-AU": "AUD",
  "en-CA": "CAD",
  "en-NZ": "NZD",
  "nl": "EUR",
  "nl-NL": "EUR",
  "nl-BE": "EUR",
  "de": "EUR",
  "de-DE": "EUR",
  "de-AT": "EUR",
  "de-CH": "CHF",
  "fr": "EUR",
  "fr-FR": "EUR",
  "fr-CH": "CHF",
  "it": "EUR",
  "it-IT": "EUR",
  "es": "EUR",
  "es-ES": "EUR",
  "pt": "EUR",
  "pt-PT": "EUR",
  "pt-BR": "BRL",
  "ja": "JPY",
  "ja-JP": "JPY",
  "ko": "KRW",
  "ko-KR": "KRW",
  "zh": "CNY",
  "zh-CN": "CNY",
  "zh-TW": "TWD",
  "sv": "SEK",
  "sv-SE": "SEK",
  "da": "DKK",
  "da-DK": "DKK",
  "nb": "NOK",
  "no": "NOK",
  "pl": "PLN",
  "pl-PL": "PLN",
  "cs": "CZK",
  "cs-CZ": "CZK",
  "tr": "TRY",
  "tr-TR": "TRY",
  "en-IN": "INR",
  "hi": "INR",
};

function getCurrency(locale: string): string {
  if (localeToCurrency[locale]) return localeToCurrency[locale];
  const lang = locale.split("-")[0];
  if (localeToCurrency[lang]) return localeToCurrency[lang];
  return "EUR";
}

export function LocalizedPrice({ amount }: { amount: number }) {
  const [formatted, setFormatted] = useState(`€${amount}`);

  useEffect(() => {
    const locale = navigator.language || "nl-NL";
    const currency = getCurrency(locale);
    try {
      const fmt = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      setFormatted(fmt.format(amount));
    } catch {
      setFormatted(`€${amount}`);
    }
  }, [amount]);

  return <>{formatted}</>;
}
