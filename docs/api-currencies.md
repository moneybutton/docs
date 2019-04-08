---
id: api-currencies
title: Currencies
---

Money Button supports every fiat currency and many popular cryptocurrencies.
Under the hood, everything is Bitcoin SV (BSV), and values are always converted
using the current exchange ratio (or historical exchange ratio for historical
data).

Users always see the cost of the transaction (including mining fees) in their
preferred currency.

Note that if you send money to yourself (for instance, if you create a button
with an output going to your user ID), the amount displayed on the button is the
cost of the transaction to you, which does not include the amount of money going
from yourself to yourself. This means that if you create a tipping button that
gives money to yourself, the button will always display a value of nearly zero
because the cost to tip yourself is only (nearly negligible) mining fees.

Developers can always create buttons with any currency. If a developer chooses a
currency different than the user, the user's preference is what is displayed on
the button. For instance, if a developer creates a button for 600 JPY (Japanese
Yen), but the user has chosen USD (US Dollar) as their preferred currency, the
user will see the value on the button displayed as 5.38 USD (or whatever is the
conversation ratio of JPY to USD at the time the button was created, plus mining
fees).

Money Button supports the following **cryptocurrencies**:

| Symbol | Name                  |
|--------|-----------------------|
| BAT    | Basic Attention Token |
| BCH    | Bitcoin Cash          |
| BSV    | Bitcoin SV            |
| BNB    | Binance               |
| BNT    | Bancor                |
| BTC    | Bitcoin               |
| DASH   | Dash                  |
| DCR    | Decred                |
| DGB    | DigiByte              |
| DOGE   | Dogecoin              |
| ETC    | Ether Classic         |
| ETH    | Ether                 |
| GNT    | Golem                 |
| KMD    | Komodo                |
| LTC    | Litecoin              |
| NEO    | Neo                   |
| OMG    | OmiseGo               |
| POLY   | Polymath              |
| QTUM   | Qtum                  |
| RDD    | Reddcoin              |
| REP    | Augur                 |
| SC     | Siacoin               |
| SNT    | Status                |
| ZEC    | Zcash                 |
| ZRX    | 0x                    |

Money Button supports the following **fiat currencies**:

| Symbol | Name                                |
|--------|-------------------------------------|
| AED    | United Arab Emirates Dirham         |
| AFN    | Afghan Afghani                      |
| ALL    | Albanian Lek                        |
| AMD    | Armenian Dram                       |
| ARS    | Argentine Peso                      |
| AUD    | Australian Dollar                   |
| AZN    | Azerbaijani Manat                   |
| BAM    | Bosnia-Herzegovina Convertible Mark |
| BDT    | Bangladeshi Taka                    |
| BGN    | Bulgarian Lev                       |
| BHD    | Bahraini Dinar                      |
| BIF    | Burundian Franc                     |
| BND    | Brunei Dollar                       |
| BOB    | Bolivian Boliviano                  |
| BRL    | Brazilian Real                      |
| BWP    | Botswanan Pula                      |
| BZD    | Belize Dollar                       |
| CAD    | Canadian Dollar                     |
| CDF    | Congolese Franc                     |
| CHF    | Swiss Franc                         |
| CLP    | Chilean Peso                        |
| CNY    | Chinese Yuan                        |
| COP    | Colombian Peso                      |
| CRC    | Costa Rican Colón                   |
| CVE    | Cape Verdean Escudo                 |
| CZK    | Czech Republic Koruna               |
| DJF    | Djiboutian Franc                    |
| DKK    | Danish Krone                        |
| DOP    | Dominican Peso                      |
| DZD    | Algerian Dinar                      |
| EGP    | Egyptian Pound                      |
| ERN    | Eritrean Nakfa                      |
| ETB    | Ethiopian Birr                      |
| EUR    | Euro                                |
| GBP    | British Pound Sterling              |
| GEL    | Georgian Lari                       |
| GHS    | Ghanaian Cedi                       |
| GNF    | Guinean Franc                       |
| GTQ    | Guatemalan Quetzal                  |
| HKD    | Hong Kong Dollar                    |
| HNL    | Honduran Lempira                    |
| HRK    | Croatian Kuna                       |
| HUF    | Hungarian Forint                    |
| IDR    | Indonesian Rupiah                   |
| ILS    | Israeli New Sheqel                  |
| INR    | Indian Rupee                        |
| IQD    | Iraqi Dinar                         |
| IRR    | Iranian Rial                        |
| ISK    | Icelandic Króna                     |
| JMD    | Jamaican Dollar                     |
| JOD    | Jordanian Dinar                     |
| JPY    | Japanese Yen                        |
| KES    | Kenyan Shilling                     |
| KHR    | Cambodian Riel                      |
| KRW    | South Korean Won                    |
| KWD    | Kuwaiti Dinar                       |
| KZT    | Kazakhstani Tenge                   |
| LBP    | Lebanese Pound                      |
| LKR    | Sri Lankan Rupee                    |
| LYD    | Libyan Dinar                        |
| MAD    | Moroccan Dirham                     |
| MDL    | Moldovan Leu                        |
| MGA    | Malagasy Ariary                     |
| MKD    | Macedonian Denar                    |
| MMK    | Myanma Kyat                         |
| MOP    | Macanese Pataca                     |
| MUR    | Mauritian Rupee                     |
| MXN    | Mexican Peso                        |
| MYR    | Malaysian Ringgit                   |
| MZN    | Mozambican Metical                  |
| NAD    | Namibian Dollar                     |
| NGN    | Nigerian Naira                      |
| NIO    | Nicaraguan Córdoba                  |
| NOK    | Norwegian Krone                     |
| NPR    | Nepalese Rupee                      |
| NZD    | New Zealand Dollar                  |
| OMR    | Omani Rial                          |
| PAB    | Panamanian Balboa                   |
| PEN    | Peruvian Nuevo Sol                  |
| PHP    | Philippine Peso                     |
| PKR    | Pakistani Rupee                     |
| PLN    | Polish Zloty                        |
| PYG    | Paraguayan Guarani                  |
| QAR    | Qatari Rial                         |
| RON    | Romanian Leu                        |
| RSD    | Serbian Dinar                       |
| RUB    | Russian Ruble                       |
| RWF    | Rwandan Franc                       |
| SAR    | Saudi Riyal                         |
| SDG    | Sudanese Pound                      |
| SEK    | Swedish Krona                       |
| SGD    | Singapore Dollar                    |
| SOS    | Somali Shilling                     |
| SYP    | Syrian Pound                        |
| THB    | Thai Baht                           |
| TND    | Tunisian Dinar                      |
| TOP    | Tongan Paʻanga                      |
| TRY    | Turkish Lira                        |
| TTD    | Trinidad and Tobago Dollar          |
| TWD    | New Taiwan Dollar                   |
| TZS    | Tanzanian Shilling                  |
| UAH    | Ukrainian Hryvnia                   |
| UGX    | Ugandan Shilling                    |
| USD    | US Dollar                           |
| UYU    | Uruguayan Peso                      |
| UZS    | Uzbekistan Som                      |
| VEF    | Venezuelan Bolívar                  |
| VND    | Vietnamese Dong                     |
| XAF    | CFA Franc BEAC                      |
| YER    | Yemeni Rial                         |
| ZAR    | South African Rand                  |
