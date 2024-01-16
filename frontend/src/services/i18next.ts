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

                //about
                aboutheaderH2:'Om sidan',
                aboutheaderH3:'Idé och ambition',
                abouttext1: 'Denna sidan innehåller det mesta av vad vi miniatyrälskare gillar på ett och samma ställe. I Inspirations vyn delar vi med oss av egna erfarenheter och skapelser. Man kan ställa frågor och be om tips från gruppen. Vi kan kommentera varandras inlägg och ge varandra tips. I Köp- och Sälj-vyn har man möjlighet att sälja dockskåpsinredning, miniatyrer och sina kreationer. ',
                abouttext2: 'Idén till sidan kom när skaparen skulle bygga ett examensarbete för sin utbildning inom frontendutveckling och tanken kom upp om man hade kunnat samla alla typer av grupper på samma sida. Där användarna har möjlighet att bli inspirerade och att ha möjligheten att bygga ut sitt samlande med kreationer och inredning som inte längre går att köpa i butik. ',
                abouttext3: 'För att bibehålla ett trevligt klimat kommer denna sida att anamma samma regler som den fungerande gruppen som finns på FB. Och nedan kan man läsa om vad man som användare av sidan förhåller sig till. Kan man inte sköta detta kommer man gå lämna sidan och inte kunna delta i denna trevliga och gemytliga miljö.',
                abouttext4: 'Välkommen till vår fantastiska minivärld!',
                abouttextRuleH3: 'Trivselregler',
                abouttextRule1:'Denna sida är till för privatpersoner som vill inspirera varandra med sina projekt och köpa och sälja dockskåpssaker och miniatyrer till varandra. Man säljer till FAST PRIS eller som AUKTION och det måste vara tydligt i annonsen vilket av det det är. ',
                abouttextRule2:'En auktion ska pågå i minst 24 timmar och allt som syns på bilden ska ingå. Man kan sätta sluttid när första budet kommer in. Meddela då vilken tid som är sluttid och vad budet ligger på. Det är den budare som ligger minuten före budtiden går ut som vinner tiden. 11.59 om man satt tiden kl. 12.00.  Kommentaren måste ligga direkt under annonsen för att gälla som bud. Efter auktionen utses vinnaren av säljaren. Säljaren tar sedan kontakt med personen över chatten för att avsluta affären. ',
                abouttextRule3:'Ett säljinlägg ska man lägga in som säljtråd och inte enskilda varor. I inlägget skriver man förutsättningar för försäljningen. Vad det är för skala, för typ av saker man säljer och portoinformation om detta tillkommer. Man kan också lägga in en bild på det man säljer. Se då till att allt på bilden kommer vara det som säljs i tråden. Till varje vara/ grupp av varor om de säljs ihop skriver man in vad det är som säljs, skicket, priset och om porto tillkommer om det ska skickas. Separata bilder på det som säljs läggs in med informationen. Om man har med något skalenligt som tex en känd docka från något stort märke som referens ska även det stå att denne ej är med i försäljningen. ',
                abouttextRule4:'Intresseinlägg ska inte läggas in på denna sidan då dessa oftast leder till röriga inlägg där man gamar till sig saker. Därför föredrar vi att de tydliga säljinläggen eller auktionerna. ',
                abouttextRule5:'Köp är bindande och det är bara ordet ”köper” som låser köpen. Om man har några frågor om varan men är beredd att köpa den skriver man ”köper om ..” Detta kan röra sig om material på varan eller att man måste veta måtten för att veta om det passar det projektet man håller på med.',
                abouttextRule6: 'Köp är bindande för både köpare och säljare. Så man väljer att lägga ut varorna här så får man inte lägga ut dem på andra sidor. Säljaren ska ta kontakt med köparen. Men båda har ett ansvar till kontakt. Inläggen ska tas bort 24 timmar efter såld vara då man har kontakt över sidans chatt.',
                abouttextRule7: 'Om varorna inte sålts inom en månad kommer dessa att tag bort. ',
                abouttextRule8: 'Det är inte tillåtet med reklam och länkar.',
                abouttextRule9: 'Om varorna skickas tänk på att packa varorna för sig. Med skyddande material som bubbelplats. Använd inte tidningspapper närmst varorna då denna kan färga av sig på sakerna. Packa alltid möbler i kartong och inte i påse.',
                aboutEventH3:'Tips på event',
                aboutEvent1:'Stockholms miniatyrmässa',
                aboutEvent1Date:'Datum: 16 mars 2024 och 12 oktober 2024',
                aboutEvent1Time:'Tid: 10-15',
                aboutEvent1Place:'Plats: Hotell Scandic Anglais',
                aboutEvent2:'Miniatyrmässa i Skåne',
                aboutEvent2Date:'Datum: 14-15 september',
                aboutEvent2Time:'Tid:10-16.30, 10-15',
                aboutEvent2Place:'Backagården, Höör, Skåne',

                //footer
                authertext: 'Built and styled by: TessDevon'
            }   
        }
    }
})