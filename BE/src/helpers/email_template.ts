type LanguageType = "el" | "en";

export const getEmailTemplate = (language: LanguageType, resetCode: string) => {
  const translations = {
    el: {
      heading: "Ο 5 ψήφιος κωδικός επαλήθευσης",
      button: "Αντιγραφή",
    },
    en: {
      heading: "Your 5 digit verification code",
      button: "Copy",
    },
  };

  return `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify your email address</title>
    <style type="text/css">
        * {
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            box-sizing: border-box;
        }

        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            line-height: 1.4;
            background-color: #F5F7F9;
            color: #839197;
            -webkit-text-size-adjust: none;
        }

        a {
            color: #414EF9;
        }

        .email-wrapper,
        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #F5F7F9;
        }

        .email-masthead {
            padding: 25px 0;
            text-align: center;
            font-size: 38px;
            color: rgb(235, 159, 38);
        }

        .email-masthead_name {
            font-weight: bold;
            font-size: 42px;
            color: rgb(235, 159, 38);
            text-decoration: none;
            text-shadow: 0 1px 0 white;
            letter-spacing: 2px;
        }

        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            border-top: 1px solid #E7EAEC;
            border-bottom: 1px solid #E7EAEC;
            background-color: #FFFFFF;
        }

        .email-body_inner,
        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
        }

        .email-footer p {
            color: #839197;
            text-align: center;
        }

        .content-cell {
            padding: 64px 35px;
        }

        h1 {
            color: #292E31;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 40px;
        }

        h2 {
            color: rgb(235, 159, 38);
            font-size: 64px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 15px;
        }

        .button {
            display: inline-block;
            width: 200px;
            background-color: rgb(235, 159, 38);
            border-radius: 3px;
            color: #ffffff;
            font-size: 15px;
            line-height: 45px;
            text-align: center;
            text-decoration: none;
            border: none;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            margin-top: 40px;
            cursor: pointer;
        }

        @media only screen and (max-width: 600px) {

            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>
</head>

<script>
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
</script>

<body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="email-masthead">
                            <a class="email-masthead_name">WeRide</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-cell">
                                        <h1>${translations[language].heading}</h1>
                                        <h2>${resetCode}</h2>
                                        <table class="body-action" align="center" width="100%" cellpadding="0"
                                            cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <button class="button"
                                                        onclick="copyToClipboard('${resetCode}')">${translations[language].button}</button>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;
};
