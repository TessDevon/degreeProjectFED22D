import i18next from "i18next";
import { initReactI18next } from "react-i18next";


i18next
.use(initReactI18next)
.init({
    compatibilityJSON: 'v3',
    debug:true,
    fallbackLng: 'sv',
    interpolation: {escapeValue: false},
    resources: { 
        sv: {
            translation: {
                //header
                appName: 'Våra minivärldar',

                //Navigation
                navigationInspirationText: 'Inspiration',
                navigationBuySellText: 'Köp och sälj',
                navigationAboutText: 'Om oss',
                navigationLogoutText: 'Logga ut',
                navigationChatText:'Chat',
                
                //Loginview
                loginMainheader: 'Gå vidare för att ta del av vår unika minivärld!',
                loginMaintext: 'Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.',
                loginInnerMainheader: 'Logga in',
                loginFormEmailText: 'Epost',
                loginFormPasswordText: 'Lösenord (minst 6 tecken, varav en stor bokstav och en siffra)',
                loginFormBtnText: 'Logga in',
                loginRegisterBtnText: 'Registrera dig som ny användare',

                //Registerview
                registerInnerMainheader: 'Registrera ny användare',
                registerFirstnameText: 'Namn',
                registerLastnameText: 'Efternamn',
                registerUserImgText: 'Användarbild (filformatet jpg och png)',
                registerRegistrationbtnText:'Registrera',

                //loginErrors
                loginErrorEmail: 'Email är fel ifyllt',
                loginErrorPassword: 'lösenord felaktigt ifyllt',
                loginErrorServererror: 'Det gick inte att logga in denna användare. Fyll i på nytt och försök igen.',
                registerErrorServererror: 'Finns redan en användare med denna email.',
                registerErrorName: 'Namnet är fel ifyllt',
                registerErrorImg: 'img går ej att spara',

                //footer
                authertext: 'Built and styled by: TessDevon'
            }   
        }
    }
})