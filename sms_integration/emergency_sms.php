<?php
    //Twillio Stuff
    require __DIR__ . '/twilio/Twilio/autoload.php';
    use Twilio\Rest\Client;
    $AccountSid = "ACd11e97442b5ac5f299dc8072ded484aa";
    $AuthToken = "03304b5dccdff25332b33c86394056f1";

    //NlpTools Stuff
    include 'nlp-tools/autoloader.php';
    use NlpTools\Tokenizers\WhitespaceAndPunctuationTokenizer;

    //SentimentAnalysisStuff
    include 'phpInsight/autoload.php';

    //Word Removal
    //Basic common word removal 
    function removeCommonWords($input){
        $commonWords = array('a','able','about','abroad','according','accordingly','actually','adj','again','against','ago','ahead','ain\'t','all','allow','allows','almost','alone','already','also','although','always','am','amid','amidst','an','and','another','any','anybody','anyhow','anyone','anything','anyway','anyways','anywhere','apart','appear','appreciate','appropriate','are','aren\'t','as','a\'s','aside','ask','asking','associated','at','available','away','awfully','b','back','backward','backwards','be','became','because','become','becomes','becoming','been','before','beforehand','begin','being','believe','best','better','between','beyond','both','brief','but','by','c','came','can','cannot','cant','can\'t','caption','cause','causes','certain','certainly','changes','clearly','c\'mon','co','co.','com','come','comes','concerning','consequently','consider','considering','contain','containing','contains','corresponding','could','couldn\'t','course','c\'s','currently','d','dare','daren\'t','definitely','described','despite','did','didn\'t','different','directly','do','does','doesn\'t','doing','done','don\'t','down','downwards','during','e','each','edu','eg','either','else','elsewhere','end','ending','enough','entirely','especially','et','etc','even','ever','evermore','every','everybody','everyone','everything','everywhere','ex','example','except','f','fairly','farther','few','fewer','for','forever','former','formerly','found','four','from','further','furthermore','g','get','gets','getting','given','gives','go','goes','going','gone','got','gotten','greetings','h','had','hadn\'t','half','happens','hardly','has','hasn\'t','have','haven\'t','having','he','he\'d','he\'ll','hello','hence','her','here','hereafter','hereby','herein','here\'s','hereupon','hers','herself','he\'s','hi','him','himself','his','hither','hopefully','how','howbeit','however','hundred','i','i\'d','ie','if','ignored','i\'ll','i\'m','immediate','in','inasmuch','inc','inc.','indeed','indicate','indicated','indicates','insofar','instead','is','isn\'t','it','it\'d','it\'ll','its','it\'s','itself','i\'ve','j','just','k','keep','keeps','kept','know','known','knows','l','last','lately','later','latter','latterly','least','less','lest','let','let\'s','like','liked','likely','likewise','little','look','looking','looks','low','lower','ltd','m','made','mainly','make','makes','many','may','maybe','mayn\'t','me','mean','meantime','meanwhile','merely','might','mightn\'t','mine','minus','miss','more','moreover','most','mostly','mr','mrs','much','must','mustn\'t','my','myself','n','name','namely','nd','near','nearly','necessary','need','needn\'t','needs','neither','never','neverf','neverless','nevertheless','new','next','nine','ninety','no','nobody','non','none','nonetheless','noone','no-one','nor','normally','not','nothing','notwithstanding','novel','now','nowhere','o','obviously','of','off','often','oh','ok','okay','old','on','once','one','ones','one\'s','only','onto','opposite','or','other','others','otherwise','ought','oughtn\'t','our','ours','ourselves','out','outside','over','overall','own','p','particular','particularly','past','per','perhaps','placed','please','plus','possible','presumably','probably','provided','provides','q','que','quite','qv','r','rather','rd','re','really','reasonably','recent','recently','regarding','regardless','regards','relatively','respectively','right','round','s','said','same','saw','say','saying','says','second','secondly','see','seeing','seem','seemed','seeming','seems','seen','self','selves','sensible','sent','several','shall','shan\'t','she','she\'d','she\'ll','she\'s','should','shouldn\'t','since','so','some','somebody','someday','somehow','someone','something','sometime','sometimes','somewhat','somewhere','soon','sorry','specified','specify','specifying','still','sub','such','sup','sure','t','take','taken','taking','tell','tends','th','than','thank','thanks','thanx','that','that\'ll','thats','that\'s','that\'ve','the','their','theirs','them','themselves','then','thence','there','thereafter','thereby','there\'d','therefore','therein','there\'ll','there\'re','theres','there\'s','thereupon','there\'ve','these','they','they\'d','they\'ll','they\'re','they\'ve','thing','things','think','this','thorough','thoroughly','those','though','throughout','thus','till','to','together','too','took','tried','tries','truly','try','trying','t\'s','twice','two','u','un','under','underneath','undoing','unfortunately','unless','unlike','unlikely','until','unto','up','upon','us','use','used','useful','uses','using','usually','v','value','various','versus','very','via','viz','vs','w','want','wants','was','wasn\'t','way','we','we\'d','welcome','well','we\'ll','went','were','we\'re','weren\'t','we\'ve','what','whatever','what\'ll','what\'s','what\'ve','when','whence','whenever','where','whereafter','whereas','whereby','wherein','where\'s','whereupon','wherever','whether','which','whichever','while','whilst','whither','who','who\'d','whoever','whole','who\'ll','whom','whomever','who\'s','whose','why','will','willing','wish','with','within','without','wonder','won\'t','would','wouldn\'t','x','y','yes','yet','you','you\'d','you\'ll','your','you\'re','yours','yourself','yourselves','you\'ve','z');
        return preg_replace('/\b('.implode('|',$commonWords).')\b/','',$input);
    }
    $emergencyWords= array('help','emergency','accident','crunch','difficult','necessity','tension','climax','clutch','compulsion','crossroad','depression','distress','exigency','extremity','fix','hole','impasse','juncture','meltdown','misadventure','pass','pinch','plight','predicament','pressure','push','quandary','scrape','squeeze','strait','urgency','vicissitude');
    $stLouisStreets= array('Aberdeen','Abner','Acme','Adelia','Adkins','Adrian','Alabama','Alamo','Albertine','Al-Clare','Alcott','Alexander','Amelia','Anna','Archwood','Arlington','Arsenal','Arundel','Ashland','Balson','Bartmer','Beacon','BeltAve.','Benvenue','Bertha','Berthold','Bircher','Bisque','Blackstone','Bleeck','Blendon','Blendon','Bluff','Bluffvlew','Brennan','Broadway ï South','Broadway ï North','Brown','Bruno','Buena Vista','Burd','Byron','Cabanne','Canterbury','Carlsbad','Carondelet','Carondelet','Chain','Chain of Rocks','Chambers','Chevrolet','Chippewa','Church','Clara','Claxton','Clayton','Clayton','Clemens','Clymer','Coal Bank','Cockrill','Commonwealth30ï 80','Comstock','Comstock','Cote Brilliante','Courtois','Creighton','Crosby','Dale','Damato','Damon','Darby','Dardenne','Davis','Davison','Decatur','Delmar','Devonshire','Dischinger','Donnell','Dressell','Dr. Martin L. King6100ï 61','Dunn','Eastgate','Ecoff','Edelle','Edna','Eichelberger','Ella','Ellendale','Ellendale','Elmbank','Emerson','Emilie','Emma','Enright','Era','Esplanade','Ethel','Etzel','Etzel Tr.','Fannie','Fauquier','Fern','Ferris','Fifth','Florissant','Floy','Forsyth','Frederick','Garesche','Garesche','Gast','Gateland','Genevieve','Gilmore','Glades','Glasgow','Glenmore','Goodfellow','Goodfellow','Gravois','Greer','Grimshaw','Hamburg','Hamilton','Harney','Harney','Hazel','Healy','Hebert','Henner','Hermitage','Hewitt','Highland','Hildesheim','Hiller','Hi Pointe','Hodiamont','Holly Hills','Horner','Horton','Howell','ltaska','Jeffrey','Johanna','Jordan','Kammerer','Kennerly','Ketmore','Kettler','Kimberly','Kingwood','Kuhs','Labadie','Lalite','Lanham','Lansdowne','Laura','Leamington','Leeton','Lena','Leona','Leonora','Lexington','Lillian','Lillian','Limit','Limit ï North','Linden','Longridge','Longridge','Lookaway','Lookout','Lookout ï East','Lookout','Lotus','Lowry','Lucille','Magnolia','Makalu','Manchester','Manhattan','Maple','Margaretta','Marla','Martella','McArthur','McCausland','McCausland','McCausland','McPherson','Melvin','Millbrook','Mimika','Minerva','Minnie','Mitchell','Morganford','Murdoch','Nashville','Natural Bridge','Nellie','Newby','Noonan','Northcrest','Northwood','Norwich','Norwich','Nottingham','Odell','Olive','Oriole','Oxford','Palm','Pamplin','Park','Parkridge','Parkway','Parkway','Parkwood','Parkwood','Partridge','Pershing','Picadilly','Plateau','Plover','Poepping','Poepping','Pointview','Prange','Primm','Primm','Prospect Grove','Queen','Rabenberg','Rhodes','Richert','Ridge','River Run','Rivermont','Rivertrail','Rivertrail','Riverview','Riverview','Robin','Roosevelt','Rosebury','Rosedale','Rowan','Saloma','Saloma','San Bonita','Scranton','Second','Selber','Semple','Shepley','Sherry','Shulte','Siemers','Skinker (South)','Skinker (North)','Skinker (North)','Southpark','Southwest','Southwood','Spring Garden','St. Edward','St. James Sq.','St. Louis','Stanley','Stratford','Suburban','Suburban Terrace','Suburban Tracks1000ï 10','Summit','Susanview','Sutherland','Tennyson Sq.','Terry','Tesson','Tesson','Tesson','Tesson','Thekla','Thekla','Theodore','Theodore','Theodosia','Third','Thrush','Tremont','University','Unter Der Linden','Valley','Vernon','Veronica','Violaview','Vivian','Wabada','Waddell','Waddell','Waldemar','Wanda','Washington','Waterman','Weber','Weber','Weber','Weber','Weber','Webmore','Weil','Weimar','Wellington','Wells','West Florissant50ï 5899','West Florissant5900ï 6328','West Park','Westminster','Whitworth','William','Wilmar','Windham','Winton','Wise','Woodbourne','Woodland','Woodstock','Woodstock','Wren','Wydown','Zellie');
    $sms_body = $_REQUEST['Body'];
    $sms_from = $_REQUEST['From'];
    $sms_body = strtolower($sms_body); 

    $text = removeCommonWords($sms_body);
    //Let's get the urgency keyword out
    $tok = new WhitespaceAndPunctuationTokenizer();
    $tok2 = $tok->tokenize($text);
    //Get Emergency Keyword 
    foreach ($emergencyWords as $key => $value) {
            if (in_array($value, $tok2)) {
                $keyToRemove = array_search($value, $tok2);           
                unset($tok2[$keyToRemove]);
                $emergencyWord=$value;
                array_values($tok2);
            }
    }        
    //Get Address
    foreach ($stLouisStreets as $key => $value) {
            if (in_array(strtolower($value), $tok2)) {
                $keyToRemove = array_search(strtolower($value), $tok2);           
                unset($tok2[$keyToRemove]);
                $streetAdd=$value;
                array_values($tok2);
            }
    }  
    //Find number of address if exists
    foreach ($tok2 as $key => $value) {
            if (is_numeric($value)) {
                $keyToRemove = array_search($value, $tok2);           
                unset($tok2[$keyToRemove]);
                $addNumber=$value;
                array_values($tok2);
            }
    }  

    //Sentiment Analysis section
    $sentiment = new \PHPInsight\Sentiment();
    // calculations:
    $scores = $sentiment->score($sms_body);
    $class = $sentiment->categorise($sms_body);
    
    //echo "Emergency Word Used: " . $emergencyWord . "\n";
    //echo "Person Location: " . $addNumber ." ". $streetAdd ."\n";
    //echo "Message: " . $sms_body ."\n";
    //echo "Sentiment Class:" . $class ."\n";
    //echo "Sentiment Scores - Negative: " . $scores[neg] . " - Neutral: " . $scores[neu] . " - Positive: " . $scores[pos] . "\n";
    

    $em_message="Emergency Word: ".$emergencyWord.", Person Location: ". $addNumber ." ". $streetAdd . " Sentiment Scores - Negative: " . $scores[neg] . " - Neutral: " . $scores[neu] . " - Positive: " . $scores[pos] . " - From: " .$sms_from;

    //Twillio send SMS to list of coordinators
    $client = new Client($AccountSid, $AuthToken);
    $phone_f = 'Emergency System';
    $people = array(
        //Ideally this should come from a database
        "+526142358740" => $phone_f
    );

    foreach ($people as $number => $name) {
        //Loop is ready for more than one numbers
        $sms = $client->account->messages->create(

            // the number we are sending to - Any phone number
            $number,
            array(
                'from' => "+14065301801", 
                // the sms body


                'body' => "Message from: Emergency System - Message: " . $em_message,
            )
        );
    }

    //Json output for Marc
    $json_output= array("FromPhone" => $sms_body, "EmergencyWord" => $emergencyWord, "Location" => ($addNumber . " " . $streetAdd), 
                        "Message" => $sms_body, "SentimentClass" => $class, "ScoresNegative"=> $scores[neg], "ScoresNeutral"=> $scores[neu], "ScoresPossitive"=>$scores[pos]);

    $json_output=json_encode($json_output);

    // acknowledge the sender
    header("content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
    <Message> Your message has been received, Help is on the way </Message>
</Response>