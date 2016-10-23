# GlobalHack VI - Team Cura

##i. Application Cura

##ii. Division: Professional

##iii. App Name: Cura

##iv. App tagline: Cura: Care for people in distress when they need it the most

##v. App description (should be approximately 500 words);



## What it does / How it works:

Cura is an intelligent platform for emergency case, shelter management and pre-prevention identification:

### Emergency Shelter Case Management:

In case of extreme emergencies (weather or other) we provide facilities for people to send a regular SMS with a sentence to an emergency response number (406-530-1801). Our system will use Natural Language Processing (NLP) and Sentiment Analysis to parse the text message and identify three things: 
1. The Urgency of the situation and provide a score, based on the analysis of the message
2. The location provided by the person (street, or street and number) - we have added all streets in St. Louis for instant recognition
3. The most relevant 'emergency' keyword

A sample emergency SMS can be: **Freezing to death, very cold, need help 151 Chippewa St.**

The emergency shelter system will send a response SMS, provide an alert on the case management system and SMS one of the persons on call for addressing the situation. Our system will keep track of all cases and will recognize existing phone numbers

### Regular Shelter Bed Case Management:

Instead of having people show up to a shelter that is full or closed, we provide facilities for people to send a regular SMS message with a brief description of their case to (559-STL-BEDS or 559-785-2337). Using Natural Language Processing (NLP) our system determines keywords in the text message to route people to the proper place based on the services they provide. The things we extract are:

1. Gender
2. Status (veteran, sex offender)
3. Age group
4. Number of people with the person

A sample Shelter bed request SMS can be: **I am Female, Veteran and youth with 3 people**

### Pre-prevention:

Due to the very incomplete and sparse data with only true positive cases provided, we determined that a machine learning model for homlessness prediction is not feasible and an appropiate route to pursue. However we provide the next best thing: a questionarie to track people that might need help in the future. Our questionarie asks typical HUD questions as well as certain factors determined by Cohen in "Aging and Homelessness." **The Gerontologist** 39 (1999): 5–14. This voluntarily filled in questionarie will allow the organizations to keep track of who will need help in the future or is in the verge of losing their home. 


## How we built it / Tech Stack:

Webapp developed using:

[![alt text](http://www.jmbanda.com/Meteor.png)](https://www.meteor.com/) 
[![alt text](http://www.jmbanda.com/angular_js.png)](https://angularjs.org/)
[![alt text](http://www.jmbanda.com/mongodb.png)](https://www.mongodb.com/)
[![alt text](http://www.jmbanda.com/php2.jpg)](https://secure.php.net/)

Web styling:

[![alt text](http://www.jmbanda.com/sass.png)](http://sass-lang.com/)
[![alt text](http://www.jmbanda.com/koala.png)](https://github.com/oklai/koala)

Natural Language Processing in PHP via - PHP Nlp Tools

https://github.com/angeloskath/php-nlp-tools/

Sentiment Analysis in PHP Via - phpInsight 

https://github.com/JWHennessey/phpInsight

License - Simplified BSD License:

Copyright (c) 2016, Team Cura
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies,
either expressed or implied, of the FreeBSD Project.

## Challenges we ran into
TOP SECRET
## Accomplishments that we're proud of
TOP SECRET
## What we learned
TOP SECRET
## What's next for TOPSECRET
TOP SECRET