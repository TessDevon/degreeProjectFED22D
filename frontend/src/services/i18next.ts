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
                navigationAboutText: 'Om sidan',
                navigationLogoutText: 'Logga ut',
                navigationChatText:'Chat',
                
                //Loginview
                loginMainheader: 'Gå vidare för att ta del av vår unika minivärld!',
                loginMaintext: 'Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.',
                loginInnerMainheader: 'Logga in',
                loginFormEmailText: 'Epost',
                loginFormPasswordText: 'Lösenord (minst 6 tecken, varav en stor bokstav och en siffra)',
                loginFormBtnText: 'Logga in',
                loginRegisterBtnText: 'Registrera dig',
                loginInfoResistrationText : 'Registrera ny användare? Tryck på knappen nedan.',

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

                inspirationheaderH2:'Inspiration',
                inspirationheaderPost: 'Inlägg',
                
                inspriationheaderAdd: 'Lägg till inlägg',
                inspirationPostErrorName:'Skriv in text i textfälten.',
                inspirationPostErrorImg:'Lägg till bild (filformatet jpg och png)',
                inspirationPostErrorServererror:'Det gick inte att spara Inlägget',
                inspirationPostText:'Här fyller du i för att skicka ett inlägga till sidan. En kort övergripande rubrik och en beskrivande text. Skicka gärna med en bild. Ett tips är att göra ett collage av bilder och postar om du vill ha med flera.',
                inspirationPostHeaderText:'Rubrik',
                inspirationPostDescriptionText: 'Beskrivning',
                inspirationPostImg: 'Lägg till bild',
                inspirationAddPostBtnText: 'Lägg till',
                inspirationCommentBtn: 'Kommentera',

                
                inspirationPostCommentDescriptionText: 'Kommentera inlägg',
                inspirationheaderScale: 'Räkna ut skala',
                inspirationScaletext1: 'Räkna om verklig skala till dockhusskala:',
                inspirationScaletextinfo1: 'För att se hur stor/hög leksaken ska vara utifrån vald skala.',
                inspirationScaletext2: 'Räkna om dockhusskala till verklig skala:',
                inspirationScaletextinfo2: 'Hur stor/hög är leksaken utifrån vald skala om den funnits i verklig mått',
                
                sellviewHeaderH2: 'Köp och sälj',
                sellviewHeaderPost: 'Säljinlägg',
                sellPostText:'Fyll i information om säljtråden. Vad? Skala? Ev frakt. Skicka gärna med en bild på varorna som säljs.',
                sellPostHeader: 'Rubrik',
                sellPostDescription: 'Beskrivning',
                sellPostImg: 'Lägg till bild',
                sellInformation: '',
                sellHeaderRule: 'Tänk på',
                selltextRule:'FAST PRIS eller som AUKTION, auktion ska pågå i minst 24 timmar och allt som syns på bilden ska ingå. Kommentera köp i varan. Köp är bindande och det är bara ordet ”köper” som låser köpen, alt "köper om...". Inläggen ska tas bort 24 timmar efter såld vara. Om varorna inte sålts inom en månad kommer dessa att tas bort.',
                sellAddItemBtn:'Kommentera',
                sellingOkMessage: 'Meddelandet är tillagt',

                sellingPostItemErrorName:'Skriv in text i textfälten.',
                sellingPostItemErrorImg:'Lägg till bild (filformatet jpg och png)',
                sellingPostItemErrorServererror:'Varan gick inte att lägga in.',
                
                sellingItemInutText: 'Lägg till vara med beskrivning och bild',
                sellItemBtn:'Lägg till',

                sellItemBuyBtn:'Kommentera',
                sellingItemInutBuyText:'Köpkommentar',

                scaleErrorRadio: 'Endast siffror',
                scaleRealHeader: 'Räkna om verkliga mått till vald dockhusskala:',
                scaleRealLabeltext: 'Verkliga mått i cm:',
                scaleRealSelectscale: 'Välj skala',
                scaleOption1: 'Skala 1:12',
                scaleOption2: 'Skala 1:18',
                scaleBtnText: 'Visa',
                scaleMessage: 'Det motsvarar',
                scaleMessage2: 'cm i vald skala.',
                scaleMiniHeader: 'Räkna om dockhus mått till verklig skala från vald dockhusskala:',
                scaleMiniLabeltext: 'Dockhusmått i cm:',
                checkNumberErrorMessage: 'Skriv endast in siffror i detta fält.',

                chatH3: 'Chat',
                chatHeaderText: 'Chat med ',
                chatHeaderFormText: 'Skicka meddelande',
                chatHeaderChatInfoText: 'Tänk på',
                chatHeaderUserText: 'Min chatlista',
                chatInfoTextBoldGold:'För att starta chat:',
                chatInfoTextBold: ' Tryck på den användaren som du vill chatta med i inspirationsvyn eller säljvyn. Då startas en chat och det är bara att börja skriva.',
                chatInfoText: 'I denna grupp hänger vi för att ha trevligt tillsammans och ge varandra energi. Köp är binande och hanteras mellan köpare och säljare. För mer info läs gärna på "Om sidan"',
                chatMessageText: 'Skriv in din text som ska skickas',
                chatMessageBtnText: 'Skicka',
                chatInnerTextMe: 'Jag skriver',
                chatInnerTextOtherPerson: 'skriver',

                //footer
                authertext: 'Built and styled by: TessDevon',
                
                alttextuserimg: 'Användarbild',
                alttextinspirationimg: 'Inspirationsbild från användare',
                alttextSellingGroupImg: 'Bild som beskriver försäljningen',
                alttextSellingItemImg: 'Bild på varan som säljs'
            }   
        }
    }
})