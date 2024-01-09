// Global currentStepIndex
let currentStepIndex = 0;
let isButtonNavigation = false; // Flag to distinguish between button and scroll navigation

const steps = document.querySelectorAll('.step');

function updateProgressBar(currentStepIndex, totalSteps) {
    const progress = (currentStepIndex / (totalSteps - 1)) * 100;

    // Define color thresholds
    const greyEnd = 100 / totalSteps * 5;   // End of intro section
    const orangeEnd = 100 / totalSteps * 10;  // End of ottoman section
    const greenEnd = 100 / totalSteps * 18;  // End of Lebanon section 

    // Construct the linear gradient background
    let gradient = `linear-gradient(to right, grey 0%, grey ${Math.min(progress, greyEnd)}%, `;
    if (progress > greyEnd) {
        gradient += `#F2A800 ${greyEnd}%, #F2A800 ${Math.min(progress, orangeEnd)}%, `;
    }
    if (progress > orangeEnd) {
        gradient += `#00a651 ${orangeEnd}%, #00a651 ${Math.min(progress, greenEnd)}%, `;
    }
    if (progress > greenEnd) {
        gradient += `#57b8c8 ${greenEnd}%, #57b8c8 ${progress}%, `;
    }
    gradient += `transparent ${progress}%, transparent 100%)`;

    // Apply the gradient to the progress bar
    document.getElementById('progress-bar').style.background = gradient;
    document.getElementById('progress-bar').style.width = '100%';
}

// Function to update the step index
function updateStepIndex(newIndex) {
    currentStepIndex = newIndex;
    updateButtonVisibility();
    updateProgressBar(currentStepIndex, steps.length);
}


// Function to update the current step
function updateCurrentStep(stepIndex) {
    currentStepIndex = stepIndex;
    console.log("Updated Step Index: ", currentStepIndex);
    updateButtonVisibility();
    updateProgressBar(currentStepIndex, steps.length);
}

// Function to change to a specific step
function goToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
        console.log("Going to Step: ", stepIndex);
        steps[stepIndex].scrollIntoView({ behavior: 'smooth' });
        updateCurrentStep(stepIndex);
    }
}

// Update visibility of navigation buttons
function updateButtonVisibility() {
    upButton.style.visibility = currentStepIndex === 0 ? 'hidden' : 'visible';
    downButton.style.visibility = currentStepIndex === steps.length - 1 ? 'hidden' : 'visible';
}

window.onload = function() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.getElementById('desktop').style.display = 'none';
        document.getElementById('mobile-message').style.display = 'block';
    }

    const downButton = document.getElementById('downButton');
    const upButton = document.getElementById('upButton');    
   
 // Button Click Events
downButton.addEventListener('click', function() {
    if (currentStepIndex < steps.length - 1) {
        isButtonNavigation = true; // Set the flag for button navigation
        updateStepIndex(currentStepIndex + 1);
        steps[currentStepIndex].scrollIntoView({ behavior: 'smooth' });
        isButtonNavigation = false; // Reset the flag after navigation
    }
});

upButton.addEventListener('click', function() {
    if (currentStepIndex > 0) {
        isButtonNavigation = true; // Set the flag for button navigation
        updateStepIndex(currentStepIndex - 1);
        steps[currentStepIndex].scrollIntoView({ behavior: 'smooth' });
        isButtonNavigation = false; // Reset the flag after navigation
    }
});

 // Hide decadeSlider and decadeLabel initially
 const decadeSlider = document.getElementById('decadeSlider');
 const decadeLabel = document.getElementById('decadeLabel');
 if (decadeSlider) {
     decadeSlider.style.display = 'none';
 }
 if (decadeLabel) {
     decadeLabel.style.display = 'none';
 }
};

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98.5795, 39.8283],
    zoom: 2
});

     // Disable default scrolling behavior
     window.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });


map.on('load', function() {


    // Set up Scrollama
    const scroller = scrollama();
    const steps = document.querySelectorAll('.step');
    

    scroller.setup({
        step: '.step',
        offset: 0.5
    })


    .onStepEnter(response => {

        if (!isButtonNavigation) { 
            console.log("Scrollama Update: Going to step", response.index);
            updateStepIndex(response.index);
        }
        // Update the current step index
    let stepIndex = Array.from(steps).indexOf(response.element);
    updateCurrentStep(stepIndex);
        let step = response.element.dataset.step;

    // Hide the elements by default
    document.getElementById("slider-container").style.display = 'none';
    document.getElementById("decadeSliderText").style.display = 'none';
    document.getElementById("decadeLabel").style.display = 'none';
    document.getElementById("decadeSlider").style.display = 'none';
    document.getElementById("playButton").style.display = 'none';

     
    document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';


    
// TITLE PAGE 

    if (step == "0") {
        document.getElementById("map").style.visibility = 'hidden';
        document.getElementById("map2").style.visibility = 'hidden';
        document.getElementById("map3").style.visibility = 'hidden';
        document.getElementById("map4").style.visibility = 'hidden';
        document.getElementById("map5").style.visibility = 'hidden';
        document.getElementById("map6").style.visibility = 'hidden';
        document.getElementById("map7").style.visibility = 'hidden';

        upButton.style.visibility = 'hidden'; // Hide the up button initially

        if (map.getLayer('historicBoundaries')) {
                map.setLayoutProperty('historicBoundaries', 'visibility', 'none');

            }

            let isTyping = true;
            let downButtonClicked = false;
            
            function typeWriter(text, n) {
                if (n < text.length && isTyping) {
                    document.getElementById("typewriter-title-green").innerHTML = text.substring(0, n + 1) + (text[n] === '\n' ? '<br/>' : '');
                    n++;
                    setTimeout(function() {
                        typeWriter(text, n);
                    }, 60);
                } else {
                    isTyping = false;
                }
            }
            
            const text = "Visualizing a life,<br>uprooted.";
            typeWriter(text, 0);
            
        
            

} 

else if (step == "1") {
    document.getElementById("map").style.visibility = 'hidden';
    document.getElementById("map2").style.visibility = 'hidden';
    document.getElementById("map3").style.visibility = 'hidden';
    document.getElementById("map4").style.visibility = 'hidden';
    document.getElementById("map5").style.visibility = 'hidden';
    document.getElementById("map6").style.visibility = 'hidden';
    document.getElementById("map7").style.visibility = 'hidden';


    if (map.getLayer('historicBoundaries')) {
            map.setLayoutProperty('historicBoundaries', 'visibility', 'none');
        }

        let isTyping = false;
        let currentPosition = 0;
        let typewriterTimeout;
        let downButtonClickedToCompleteTyping = false;
        


        function typeWriter(text, n) {
            if (n < text.length) {
                isTyping = true;
                currentPosition = n;
                document.getElementById("typewriter-title").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
                n++;
                typewriterTimeout = setTimeout(function() {
                    typeWriter(text, n);
                }, 60);
            } else {
                isTyping = false;
                document.getElementById("caption").style.display = 'block'; // Show the caption
            }
        
            if (downButtonClickedToCompleteTyping) {
                clearTimeout(typewriterTimeout);
                document.getElementById("typewriter-title").innerHTML = text;
                isTyping = false;
            }
        }
        
        const text = '"It is my hope to organize this accumulated recorded information\ninto a comprehensive account of my life and thoughts\n for the benefit of the younger generation who,\n never having experienced life outside these United States,\n have little conception of the lives and times of their forebears."';
        typeWriter(text, 0);


        function isElementInView(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        

        function checkVisibility() {
            const typewriterElement = document.getElementById('typewriter-title');
            if (isElementInView(typewriterElement)) {
                if (!isTyping) {
                    typeWriter(text, currentPosition); // Continue typing from the current position
                }
            } else {
                if (isTyping) {
                    clearTimeout(typewriterTimeout); // Stop typing
                    isTyping = false;
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // Initial check when the page loads
        
        


// 

} else if (step == "2") {
            document.getElementById("map").style.visibility = 'hidden';
            document.getElementById("map2").style.visibility = 'hidden';
            document.getElementById("map3").style.visibility = 'hidden';
            document.getElementById("map4").style.visibility = 'hidden';
            document.getElementById("map5").style.visibility = 'hidden';
            document.getElementById("map6").style.visibility = 'hidden';
            document.getElementById("map7").style.visibility = 'hidden';


        if (map.getLayer('historicBoundaries')) {
                map.setLayoutProperty('historicBoundaries', 'visibility', 'none');
            }


} else if (step == "3") {
            document.getElementById("map").style.visibility = 'hidden';
            document.getElementById("map2").style.visibility = 'hidden';
            document.getElementById("map3").style.visibility = 'hidden';
            document.getElementById("map4").style.visibility = 'hidden';
            document.getElementById("map5").style.visibility = 'hidden';
            document.getElementById("map6").style.visibility = 'hidden';
            document.getElementById("map7").style.visibility = 'hidden';


        if (map.getLayer('historicBoundaries')) {
                map.setLayoutProperty('historicBoundaries', 'visibility', 'none');
            }  

        } else if (step == "4") {
            document.getElementById("map").style.visibility = 'hidden';
            document.getElementById("map2").style.visibility = 'hidden';
            document.getElementById("map3").style.visibility = 'hidden';
            document.getElementById("map4").style.visibility = 'hidden';
            document.getElementById("map5").style.visibility = 'hidden';
            document.getElementById("map6").style.visibility = 'hidden';
            document.getElementById("map7").style.visibility = 'hidden';


        if (map.getLayer('historicBoundaries')) {
                map.setLayoutProperty('historicBoundaries', 'visibility', 'none');
            }  


// OTTOMAN EMPIRE CONTEXT 
    } else if (step == "5") {
        document.getElementById("map").style.visibility = 'visible';
        document.getElementById("map2").style.visibility = 'hidden';
        document.getElementById("map3").style.visibility = 'hidden';
        document.getElementById("map4").style.visibility = 'hidden';
        document.getElementById("map5").style.visibility = 'hidden';
        document.getElementById("map6").style.visibility = 'hidden';
        document.getElementById("map7").style.visibility = 'hidden';


        let isTyping = false;
        let currentPosition = 0;
        let typewriterTimeout;
        
        function typeWriter(text, n) {
            if (n < text.length) {
                isTyping = true;
                currentPosition = n;
                document.getElementById("typewriter-left").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
                n++;
                typewriterTimeout = setTimeout(function() {
                    typeWriter(text, n);
                }, 55);
            } 
        }
        
        const text = "My parents lived in troubled times. During the second half of the 19th century and the beginning of the 20th century, hostile discrimination and persecutions of Armenians intensified throughout the Ottoman Empire. Originally, Armenians flourished and held important positions.<br><br>However, after Sultan Abdul-Hamid I ascended the throne, Kurds and Muslim tribesmen were recruited to form regiments that were allowed to attack, kill, and plunder Armenian communities, generally during periods of economic depression.";
        
        function isElementInView(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        function checkVisibility() {
            const typewriterElement = document.getElementById('typewriter-left');
            if (isElementInView(typewriterElement)) {
                if (!isTyping) {
                    typeWriter(text, currentPosition); // Continue typing from the current position
                }
            } else {
                if (isTyping) {
                    clearTimeout(typewriterTimeout); // Stop typing
                    isTyping = false;
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // Initial check when the page loads
        

 // add historic Ottoman boundaries geoJson
 if (!map.getSource('historicBoundaries')) {
        map.addSource('historicBoundaries', {
            'type': 'geojson',
            'data': 'historicBoundaries.geojson'
    }
);

   // Add layer to render data
   map.addLayer({
            'id': 'historicBoundaries',
            'type': 'fill',
            'source': 'historicBoundaries',
            'layout': {},
            'paint': {
                'fill-color': '#FFA500',  
                'fill-opacity': 0.5    
            }
        });


    } else {
        map.setLayoutProperty('historicBoundaries', 'visibility', 'visible');
    }
 // Add red dot on Kilis
 var kilisCoordinates = [37.115, 36.7161]; 

if (!map.getSource('kilis-point')) {
        map.addSource('kilis-point', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': kilisCoordinates
                }
            }
        });

        map.addLayer({
            'id': 'kilis-point-layer',
            'type': 'circle',
            'source': 'kilis-point',
            'paint': {
                'circle-radius': 7,
                'circle-color': '#00a651'
            }
        });
    } else {
        map.setLayoutProperty('kilis-point-layer', 'visibility', 'visible');
    }
    
    map.flyTo({ 
        center: [24.72719216293653, 35.285415018770976],
        zoom: 3,
        speed: 0.3,
        curve: 0.5,
        essential: true }); // Fly to Kilis

 if (!map.getLayer('kilis-label')) {
        map.addLayer({
            'id': 'kilis-label',
            'type': 'symbol',
            'source': 'kilis-point', 
            'layout': {
                'text-field': 'Kilis',
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-radial-offset': 0.5,
                'text-justify': 'auto',
                'text-size': 20,            },
            'paint': {
                'text-color': '#141c27',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1
            }
        });
    } else {
        map.setLayoutProperty('kilis-label', 'visibility', 'visible');
    }


}
    
// KILIS PLATEAU VIDEO 
    else if (step == "6") {

        document.getElementById("map").style.visibility = 'hidden';
        document.getElementById("map2").style.visibility = 'hidden';
        document.getElementById("map3").style.visibility = 'hidden';
        document.getElementById("map4").style.visibility = 'hidden';
        document.getElementById("map5").style.visibility = 'hidden';
        document.getElementById("map6").style.visibility = 'hidden';
        document.getElementById("map7").style.visibility = 'hidden';
        document.getElementById("map").style.visibility = 'hidden';


        let isTyping = false;
        let currentPosition = 0;
        let typewriterTimeout;
        
        function typeWriter(text, n) {
            if (n < text.length) {
                isTyping = true;
                currentPosition = n;
                document.getElementById("typewriter-kilis-plateau-video").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
                n++;
                typewriterTimeout = setTimeout(function() {
                    typeWriter(text, n);
                }, 55);
            } 
        }
        
        const text = "Kilis, where I was born, is a small town on a plateau about 30 miles to the north of Aleppo with a population of about 30,000 people of which two-thirds were Muslims and about one-third were Christians, the homes of which were mostly segregated.<br><br> The King would order that on a certain day of a certain year every Muslim had the right to kill or rob the house of any Christian. Not all Muslims obeyed these orders, in fact some protected Christians, such as my father’s Turkish friend, Haji Mohammed, who provided us shelter in his palace during massacres.";
        
        function isElementInView(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        function checkVisibility() {
            const typewriterElement = document.getElementById('typewriter-kilis-plateau-video');
            if (isElementInView(typewriterElement)) {
                if (!isTyping) {
                    typeWriter(text, currentPosition); 
                }
            } else {
                if (isTyping) {
                    clearTimeout(typewriterTimeout); 
                    isTyping = false;
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
        

        var plateauvideo = document.getElementById('kilis-plateau');
        plateauvideo.play();

        // Set playback rate of video
       plateauvideo.playbackRate = 0.75;

    }



// HAGOP BROTHER
else if (step == "7") {
        map.setStyle('mapbox://styles/mapbox/light-v11');
        document.getElementById("map").style.visibility = 'hidden';
        document.getElementById("map2").style.visibility = 'hidden';
        document.getElementById("map3").style.visibility = 'hidden';
        document.getElementById("map4").style.visibility = 'hidden';
        document.getElementById("map5").style.visibility = 'hidden';
        document.getElementById("map6").style.visibility = 'hidden';
        document.getElementById("map7").style.visibility = 'hidden';


        let isTyping = false;
        let currentPosition = 0;
        let typewriterTimeout;
        
        function typeWriter(text, n) {
            if (n < text.length) {
                isTyping = true;
                currentPosition = n;
                document.getElementById("typewriter-hagop").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
                n++;
                typewriterTimeout = setTimeout(function() {
                    typeWriter(text, n);
                }, 55);
            } 
        }
        
        const text = "I was born in 1895, the year of <b>great massacre in Kilis</b>.<br><br>In that year three of my cousins were slaughtered.<br><br> Perhaps I owe my life to my brother Hagop. When my family members (5 brothers, 3 sisters, my father and mother) were running to take shelter in Haji Mohammed’s quarters during the massacre, I was ill and in my mother's desperation to protect her older children and perhaps because she had little hope that I would survive, she expressed a thought of leaving me behind.<br><br> My brother Hagop protested and insisted that I be taken along to share whatever fate was in store for the rest of the family.";
        
        function isElementInView(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        function checkVisibility() {
            const typewriterElement = document.getElementById('typewriter-hagop');
            if (isElementInView(typewriterElement)) {
                if (!isTyping) {
                    typeWriter(text, currentPosition); 
                }
            } else {
                if (isTyping) {
                    clearTimeout(typewriterTimeout);
                    isTyping = false;
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
        

       
    }


// HOUSE IN KILIS 
    else if (step == "8") {
        map.setStyle('mapbox://styles/mapbox/light-v11');
        document.getElementById("map").style.visibility = 'hidden';
        document.getElementById("map2").style.visibility = 'hidden';
        document.getElementById("map3").style.visibility = 'hidden';
        document.getElementById("map4").style.visibility = 'hidden';
        document.getElementById("map5").style.visibility = 'hidden';
        document.getElementById("map6").style.visibility = 'hidden';
        document.getElementById("map7").style.visibility = 'hidden';

        let isTyping = false;
        let currentPosition = 0;
        let typewriterTimeout;
        
        function typeWriter(text, n) {
            if (n < text.length) {
                isTyping = true;
                currentPosition = n;
                document.getElementById("typewriter-kilis-house").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
                n++;
                typewriterTimeout = setTimeout(function() {
                    typeWriter(text, n);
                }, 55);
            } 
        }
        
        const text = "Our home was in a mixed quarter of Muslims and Armenians. As soon as you entered from the big entrance there were twenty steps which took you to an oda outside where people would come and sleep in the open air.<br><br> Outside was a big door, one could take out animals, horses. The outside courtyard was at least twenty meters in extension. At one end there was a place where we used to bring our horses and mules during the summer. One of my jobs was to get the sheep and goats out to the shepherd's place before I went to school.";
        
        function isElementInView(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        function checkVisibility() {
            const typewriterElement = document.getElementById('typewriter-kilis-house');
            if (isElementInView(typewriterElement)) {
                if (!isTyping) {
                    typeWriter(text, currentPosition); 
                }
            } else {
                if (isTyping) {
                    clearTimeout(typewriterTimeout); 
                    isTyping = false;
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); 
        
        
        var video = document.getElementById('kilis-house');
        video.play();
    }


else if (step == "9") {
    document.getElementById("map").style.visibility = 'hidden';
    document.getElementById("map2").style.visibility = 'hidden';
    document.getElementById("map3").style.visibility = 'hidden';
    document.getElementById("map4").style.visibility = 'hidden';
    document.getElementById("map5").style.visibility = 'hidden';
    document.getElementById("map6").style.visibility = 'hidden';
    document.getElementById("map7").style.visibility = 'hidden';
}  

else if (step == "10") {
    document.getElementById("map").style.visibility = 'hidden';
    document.getElementById("map2").style.visibility = 'visible';
    document.getElementById("map3").style.visibility = 'hidden';
    document.getElementById("map4").style.visibility = 'hidden';
    document.getElementById("map5").style.visibility = 'hidden';
    document.getElementById("map6").style.visibility = 'hidden';
    document.getElementById("map7").style.visibility = 'hidden';

    let isTyping = false;
    let currentPosition = 0;
    let typewriterTimeout;
    
    function typeWriter(text, n) {
        if (n < text.length) {
            isTyping = true;
            currentPosition = n;
    
            let currentContent = text.substring(0, n + 1);
            document.getElementById("typewriter-kilis-beirut").innerHTML = currentContent + (text[n] === '\n' ? '<br/>' : '');
    
            if (text.substring(n).startsWith('<img')) {

                let imgTagEnd = text.indexOf('>', n);
                if (imgTagEnd !== -1) {
                    document.getElementById("typewriter-kilis-beirut").innerHTML = text.substring(0, imgTagEnd + 1);
                    n = imgTagEnd;
                }
            }
    
            n++;
            typewriterTimeout = setTimeout(function() {
                typeWriter(text, n);
            }, 55);
        } else {
            isTyping = false;
        }
    }
    
    
    const text = "The entire Yeni-Komshian family left with what they could carry with them. The train I took from Aleppo to Beirut was the last train one could travel in without having to take a special permit. Since at that time I was of military age, I would not have gotten the special permit to leave. In preparation for my medical school fees, board and room, I stitched 27 Turkish gold pounds to the belt of my undershirt.<br><br><div style='text-align: center;'><img src='media/goldcoins.png' style='max-height: 8%; max-width: 8%; display: inline-block; vertical-align: middle;'/>";  
    function isElementInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    
    function checkVisibility() {
        const typewriterElement = document.getElementById('typewriter-kilis-beirut');
        if (isElementInView(typewriterElement)) {
            if (!isTyping) {
                typeWriter(text, currentPosition); 
            }
        } else {
            if (isTyping) {
                clearTimeout(typewriterTimeout); 
                isTyping = false;
            }
        }
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); 
    


    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';
(async () => {
const map2 = new mapboxgl.Map({
container: 'map2',
zoom: 13,
center: [37.11930352127317, 36.71539178642357],
pitch: 76,
bearing: 150,
style: 'mapbox://styles/mapbox/satellite-v9',
interactive: false,
hash: false
});
 
const [pinRouteGeojson] = await Promise.all([
fetch(
'kilis_beirut.geojson'
).then((response) => response.json()),
map2.once('style.load')
]);
 
map2.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.terrain-rgb',
'tileSize': 512,
'maxzoom': 14
});
map2.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 4 });
 
const pinRoute = pinRouteGeojson.features[0].geometry.coordinates;

const popup = new mapboxgl.Popup({ closeButton: false });

const el = document.createElement('div');
el.className = 'custom-marker';
el.style.backgroundImage = 'url(media/historictrain_2.png)'; 
el.style.width = '5%'; 
el.style.height = '4%';
el.style.backgroundSize = '100%';

const marker = new mapboxgl.Marker(el, {
  draggable: false,
  pitchAlignment: 'auto',
  rotationAlignment: 'auto'
})
.setLngLat(pinRoute[0])
.setPopup(popup)
.addTo(map2)
.togglePopup();
 
map2.addSource('line', {
type: 'geojson',
lineMetrics: true,
data: pinRouteGeojson
});
map2.addLayer({
type: 'line',
source: 'line',
id: 'line',
paint: {
'line-color': 'rgba(0,0,0,0)',
'line-width': 5
},
layout: {
'line-cap': 'round',
'line-join': 'round'
}
});
 
await map2.once('idle');
const animationDuration = 200000;
const path = turf.lineString(pinRoute);
const pathDistance = turf.lineDistance(path);
let start;
function frame(time) {
if (!start) start = time;
const animationPhase = (time - start) / animationDuration;
if (animationPhase > 1) {
return;
}
 
const alongPath = turf.along(path, pathDistance * animationPhase)
.geometry.coordinates;
const lngLat = {
lng: alongPath[0],
lat: alongPath[1]
};

const elevation = Math.floor(
map2.queryTerrainElevation(lngLat, { exaggerated: false })
);
marker.setLngLat(lngLat);

map2.setCenter(lngLat);

map2.setPaintProperty('line', 'line-gradient', [
'step',
['line-progress'],
'#F2A800',
animationPhase,
'rgba(255, 0, 0, 0)'
]);
 
const rotation = 150 - animationPhase * 40.0;
map2.setBearing(rotation % 360);
 
window.requestAnimationFrame(frame);
}
 
window.requestAnimationFrame(frame);
})();

}


// BEIRUT 3-D MAP

else if (step == "11") {

document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';

let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-beirut-1920s").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 55);
    } 
}

const text = "In October 1914, I entered the American University of Beirut (AUB), to which I am eternally grateful for giving me a safe refuge during the years of slaughter. I have roots in Beirut, and Lebanon has been good to me.  I came here as a young man when the first world war started. As an Armenian I had no money and our family was in deportation. I had to study, wait on tables, arrange the tennis courts and at the same time hide myself from Turkish persecution. I was an Armenian and according to the laws I ought to be either in exile or killed-- but I bought Persian Nationality with the 2 gold pounds. <br><br> In 1918, I was given the privilege of giving the customary valedictorian speech as the student who attained the highest grade. This was of great embarrassment for me because I was all the time hiding myself. To appear on the platform in the presence of Turkish Officials with an Armenian name, although quite unrecognizable in its Persian translation, I was apt to be caught and dealt with like other Armenians of my age. So, I went to my good friend and advisor and asked him how I could get out of this situation. He said to tell the University you have stage fright and that your delivery is rather slow and if you are trying to give an address and you cannot find your words, it will be a disgrace not only to yourself but also the University. I told that to the President, and I was excused from the speech.";

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-beirut-1920s');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout);
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 

    }


// ZAHLE - BEIRUT 


else if (step == "12") {

document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'visible';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';


let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-zahle-beirut").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 45);
    } 
}

const text = "One of the happiest days of my life came on the 19th of November 1918, when we learned that the Turkish had left Beirut. For the first time in my life, I felt the sweet sensation of freedom. I was no more a fugitive, no more an outlaw. I could meet people and talk to them straight, look at their faces instead of looking at the ground. The sight of the retreat of Turkish army in their disorder all the way from Zahle to Beirut gave me great delight. After all, these people were our masters, now they had to flee for their lives.</span><br><br>On the day of armistice, people stopped killing each other. The victors sat around a table and negotiated, and our hopes were great; we were going to live in a better, more equitable, more just life. That is what we were being told, that so many people are dying but it is worth the sacrifice because this is to improve the world, to make it a better world to live in. In an effort, they kept on saying, to make democracy. I did not have the same understanding of human nature at that time, I believed them."; 


function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-zahle-beirut');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout); 
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';

(async () => {
const map4 = new mapboxgl.Map({
container: 'map4',
zoom: 11,
center: [35.55467926251227, 33.896361537341704],
pitch: 40,
bearing: 90,
style: 'mapbox://styles/mapbox/satellite-v9',
interactive: false,
hash: false
});
 
const [pinRouteGeojson] = await Promise.all([
fetch(
'zahle_beirut.geojson'
).then((response) => response.json()),
map4.once('style.load')
]);
 
 
map4.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.terrain-rgb',
'tileSize': 512,
'maxzoom': 9
});
map4.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 4 });
 
const pinRoute = pinRouteGeojson.features[0].geometry.coordinates;

const popup = new mapboxgl.Popup({ closeButton: false });

const el2 = document.createElement('div');
el2.className = 'custom-marker';
el2.style.backgroundImage = 'url(media/ottomantroops.png)'; 
el2.style.width = '5%'; 
el2.style.height = '5%';
el2.style.backgroundSize = 'contain';
el2.style.backgroundRepeat = 'no-repeat';


const marker = new mapboxgl.Marker(el2, {
  draggable: false,
  pitchAlignment: 'auto',
  rotationAlignment: 'auto'
})
.setLngLat(pinRoute[0])
.setPopup(popup)
.addTo(map4)
.togglePopup();

 
map4.addSource('line', {
type: 'geojson',

lineMetrics: true,
data: pinRouteGeojson
});
map4.addLayer({
type: 'line',
source: 'line',
id: 'line',
paint: {
'line-color': 'rgba(0,0,0,0)',
'line-width': 5
},
layout: {
'line-cap': 'round',
'line-join': 'round'
}
});
 
await map4.once('idle');
const animationDuration = 70000;
const path = turf.lineString(pinRoute);
const pathDistance = turf.lineDistance(path);
let start;

function frame(time) {
if (!start) start = time;
const animationPhase = (time - start) / animationDuration;
if (animationPhase > 1) {
return;
}
 
const alongPath = turf.along(path, pathDistance * animationPhase)
.geometry.coordinates;
const lngLat = {
lng: alongPath[0],
lat: alongPath[1]
};

const elevation = Math.floor(
map4.queryTerrainElevation(lngLat, { exaggerated: false })
);
 
marker.setLngLat(lngLat);

map4.setCenter(lngLat);
map4.setPaintProperty('line', 'line-gradient', [
'step',
['line-progress'],
'#F2A800',
animationPhase,
'rgba(255, 0, 0, 0)'
]);
 
const rotation = 150 - animationPhase * 40.0;
map4.setBearing(rotation % 360);
 
window.requestAnimationFrame(frame);
}
 
window.requestAnimationFrame(frame);
})();



}

else if (step == "13") {

    document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'visible';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';

const slider = document.getElementById("slider");
const foregroundImg = document.querySelector(".foreground-img");
const sliderButton = document.querySelector(".slider-button");

slider.addEventListener("input", (e) => {
  const sliderPos = e.target.value;
  
  foregroundImg.style.width = `${sliderPos}%`;
  
  sliderButton.style.left = `calc(${sliderPos}% - 18px)`;
});

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';
const map5 = new mapboxgl.Map({
style: 'mapbox://styles/mapbox/light-v11',
center: [35.48270422468636, 33.89737218342625],
zoom: 16,
pitch: 70,
bearing: -17.6,
container: 'map5'
});
 
function rotateCamera(timestamp) {
    map5.rotateTo((timestamp / 200) % 360, { duration: 0 });

    requestAnimationFrame(rotateCamera);
    }

const buildingGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [35.482619079147184, 33.89714336843602],
              [35.482634443421006, 33.89718162731772],
              [35.48271455713552, 33.89716249787929],
              [35.482724434169484, 33.89720257860313],
              [35.48275735761274, 33.89719346934913],
              [35.48279906064286, 33.89731917696531],
              [35.482779306576305, 33.89732464250923],
              [35.482794670850126, 33.89736563408074],
              [35.482624566387045, 33.89740662563203],
              [35.48262017659431, 33.89738931809079],
              [35.482582863358346, 33.89739478363023],
              [35.48252579605446, 33.89721442063164],
              [35.4825620118433, 33.89720440045386],
              [35.48254664756948, 33.89716158695322],
              [35.482619079147184, 33.897144279362294],
            ],
          ],
        },
      },
    ],
  };


const buildingFeature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: buildingGeoJSON,
  },
  properties: {
    title: 'Highlighted Building',
    description: '',
  },
};

     
    map5.on('load', () => {
    rotateCamera(0);
     
    const layers = map5.getStyle().layers;
    for (const layer of layers) {
    if (layer.type === 'symbol' && layer.layout['text-field']) {
    map5.removeLayer(layer.id);
    }
    }
     
    map5.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#fbfbff',
     
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    });

  map5.addSource('highlighted-building', {
    type: 'geojson',
    data: buildingGeoJSON,
  });

  map5.addLayer({
    id: 'highlighted-building-layer',
    type: 'fill',
    source: 'highlighted-building',
    paint: {
      'fill-color': '#00a651', 
      'fill-opacity': 1.0, 
    },
  });
});

}

else if (step == "14") {

    document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';


    
}

else if (step == "15") {

    document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';


    
}

else if (step == "16") {

    document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';


let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-left-lebanon").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 55);
    } 
}

const text = "Lebanon, with all its faults, was a beautiful country to live in. And it has been good to us, good to Armenians; they gave us a home, they gave us a nationality, they gave us an identity. We built homes, we got married, had children, and educated our children. I hope and pray that the things will improve.";

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-left-lebanon');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout);
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility();


    
}


// LEBANON WORD CLOUD MAP

else if (step == "17") {

document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'visible';
document.getElementById("map7").style.visibility = 'hidden';

document.getElementById("decadeSliderText").style.display = 'block';
document.getElementById("decadeLabel").style.display = 'block';
document.getElementById("decadeSlider").style.display = 'block';
document.getElementById("playButton").style.display = 'block';
document.getElementById("slider-container").style.display = 'block';


var mountainhouse = document.getElementById('mountain-house');
       mountainhouse.play();
       mountainhouse.playbackRate = 0.5;

let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-lebanon-word-cloud").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 55);
    } 
}

const text = "Life in beautiful Lebanon was most pleasant, but we have gone through quite a number of changes and revolts and factional fights, and lost a great deal during this current civil war. The turmoil which started in 1975 has exacerbated continuously and the worst of it has come on us since April 1975. <br><br> We stood firm as long as we could but suffered hardships we could not easily endure at our age. All our children living in the United States were burdened with increasing anxiety on our account, particularly when personal communication by letter or telephone became impossible.";
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-lebanon-word-cloud');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout); 
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';

const map6 = new mapboxgl.Map({
        container: 'map6',
        style: 'mapbox://styles/amcam33/clo1pz3yy00bf01pd159y78ia',
        center: [35.48270422468636, 33.89737218342625],
        zoom: 8,
        pitch: 0, 
        bearing: 0 
    });

    const decadeSlider = document.getElementById('decadeSlider');
    const decadeLabel = document.getElementById('decadeLabel');
    decadeLabel.textContent = decadeSlider.value;

    let featuresCollection = [];

    function getFontSize(frequency) {
        return 10 + frequency * 2; 
    }
    

    d3.csv('lebanon_wordcloud_final_filtered_new_coords.csv').then(function (data) {
        data.forEach(function (row) {
            const text = row.word;
            const latitude = parseFloat(row.latitude);
            const longitude = parseFloat(row.longitude);
            const frequency = parseFloat(row.frequency);
            const year = parseInt(row.decade);

            const fontSize = getFontSize(frequency);

            const labelSpacingLongitude = 0.1;
            const labelSpacingLatitude = 0.1;
            const offsetLongitude = labelSpacingLongitude * (Math.random() - 0.5);
            const offsetLatitude = labelSpacingLatitude * (Math.random() - 0.5);

            featuresCollection.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude + offsetLongitude, latitude + offsetLatitude]
                },
                properties: {
                    text: text,
                    fontSize: fontSize,
                    frequency: frequency,
                    year: year
                }
            });
        });

            // Ensure map6 is initialized and style is loaded
        map6.on('load', function() {
        map6.addSource('labels-source', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: featuresCollection
            }
        });

        map6.addLayer({
            id: 'words-layer',
            type: 'symbol',
            source: 'labels-source',
            layout: {
                'text-field': ['get', 'text'],
                'text-size': ['get', 'fontSize'],
                'text-allow-overlap': false,
                'visibility': 'visible'
            },
            paint: {
                'text-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'frequency'],
                    0, '#141c27',  
                    5, '#00a651',  
                    10, '#00a651', 
                    15, '#00a651', 
                    20, '#00a651' 
                ]                
            }
        });
    }).catch(function(error) {
        console.error("Error loading CSV data: ", error);
    });

// Coordinates and titles for the locations
const locations = [
    {
        // Dhour el Choueir
        coordinates: [35.8333, 33.8333],
        title: "Dhour el Choueir"
    },
    {
        // Beirut
        coordinates: [35.5018, 33.8938],
        title: "Beirut"
    },
    {
        // Kilis
        coordinates: [37.1180687803754,36.71563454955178],
        title: "Kilis"
    }
];

const locationFeatures = locations.map(location => ({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: location.coordinates
    },
    properties: {
        title: location.title
    }
}));

map6.on('load', function () {
    map6.addSource('locations', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: locationFeatures
        }
    });

    map6.addLayer({
        id: 'locations-layer',
        type: 'circle',
        source: 'locations',
        paint: {
            'circle-radius': 6, 
            'circle-color': '#e74c3c' 
        }
    });

    map6.addLayer({
        id: 'labels-layer',
        type: 'symbol',
        source: 'locations',
        layout: {
            'text-field': ['get', 'title'],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'text-size': 18,
            'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Bold'] 

        },
        paint: {
            'text-color': '#ffffff'
        }
    });
});

        map6.on('zoom', function () {
            const currentZoom = map6.getZoom();
        console.log("Current Zoom Level:", currentZoom); 
            if (currentZoom >= 10 && currentZoom <= 12) {
                map6.setFilter('words-layer', ['>', 'frequency', 1]);
            } else if (currentZoom < 10) {
                map6.setFilter('words-layer', ['>=', 'frequency', 0]); 
            }
        });
    });

    decadeSlider.addEventListener('input', function () {
        const selectedDecade = parseInt(decadeSlider.value);
        decadeLabel.textContent = selectedDecade + 's';
        map6.setFilter('words-layer', ['all', ['>=', 'frequency', 0], ['==', 'year', selectedDecade]]);
    });

    let intervalID = null;

    function updateSlider() {
        let currentValue = parseInt(decadeSlider.value);
        let maxValue = parseInt(decadeSlider.max);
        let step = parseInt(decadeSlider.step);

        if (currentValue + step > maxValue) {
            currentValue = parseInt(decadeSlider.min);
        } else {
            currentValue += step;
        }

        decadeSlider.value = currentValue;
        decadeLabel.textContent = currentValue + 's';
        decadeSlider.dispatchEvent(new Event('input'));
    }

    document.getElementById('playButton').addEventListener('click', function () {
        console.log('Play button clicked');
        if (intervalID === null) {
            intervalID = setInterval(updateSlider, 2000);
            this.textContent = 'Stop';
        } else {
            clearInterval(intervalID);
            intervalID = null;
            this.textContent = 'Start';
        }
    });

    
}

else if (step == "18") {

document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'visible';


let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-lebanon-usa").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 55);
    } 
}

const text = "It was far from easy to leave our home of fifty years with all its associations, but we lived through it and arrived in the United States on August 23, 1979.<br><br> But the difficulty of Armenians is that they are not allowed to live for more than one generation in one place except in America. My father’s father was born in Agen in Turkey and died in Kilis; my father was born in Kilis, and died in Beirut, so were my mother and my two brothers that have died. My children are all born in Beirut and they are all American citizens now. I do not know where I am going to die and be buried.<br><br> Now, one great satisfaction of my life for which I am grateful to God is that all my children, everyone of the five, is settled in the United States of America which I believe, with all its defects, is still the best country in the world to make your home. This is because after a generation or two you are no longer foreigners; you are one of them.  They tried first to put everyone into an amalgam and to make a nation of this amalgam. Then they have changed their mind in the last few years, to live free to pursue their culture, their art, their identity"; 
                         
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-lebanon-usa');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout); 
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYW0zMyIsImEiOiJjbG52NjJ0OWswanA4MmtueGk0cWxjNGN2In0.9unlp_ocI7GFYNdPbgUdsw';

const destinations = [
    { center: [43.050925724784626, 39.718356549865014], zoom: 8, pitch: 50, bearing: 0 }, 
    { center: [37.12028310825196, 36.716004740395555], zoom: 12, pitch: 0, bearing: 0 }, 
    { center: [37.148794702012246, 36.21505012752638], zoom: 9, pitch: 100, bearing: 0 }, 
    { center: [35.5131, 33.8869], zoom: 12, pitch: 100, bearing: 130 }, // Beirut, Lebanon
    { center: [-77.0369, 38.9072], zoom: 10, pitch: 75, bearing: 130 } // USA (Washington, D.C.)
];

const map7 = new mapboxgl.Map({
    container: 'map7', 
    style: 'mapbox://styles/amcam33/clo1pz3yy00bf01pd159y78ia', 
    center: destinations[0].center, 
    zoom: destinations[0].zoom,
    pitch: destinations[0].pitch,
    bearing: destinations[0].bearing
});

map7.on('load', () => {
    // Custom atmosphere styling
    map7.setFog({
        'high-color': '#F2A800', // Lower atmosphere color
        'color': '#F2A800', // Upper atmosphere color
        'horizon-blend': 0 // Exaggerate atmosphere
    });

    // Add the terrain source
    map7.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb'
    });

    // Set the terrain with exaggeration
    map7.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 2
    });

    flyToDestination(1); // Start with the second destination
});

// Function to fly to a destination
function flyToDestination(index) {
    if (index >= destinations.length) return; // Stop if no more destinations

    map7.flyTo({
        ...destinations[index],
        essential: true,
        duration: 20000 // Duration of the flight in milliseconds
    });

    // Schedule the next flight after the current one finishes
    setTimeout(() => flyToDestination(index + 1), 11000); // 20s flyTo + 1s buffer
}


    
}

else if (step == "19") {

document.getElementById("map").style.visibility = 'hidden';
document.getElementById("map2").style.visibility = 'hidden';
document.getElementById("map3").style.visibility = 'hidden';
document.getElementById("map4").style.visibility = 'hidden';
document.getElementById("map5").style.visibility = 'hidden';
document.getElementById("map6").style.visibility = 'hidden';
document.getElementById("map7").style.visibility = 'hidden';

let isTyping = false;
let currentPosition = 0;
let typewriterTimeout;

function typeWriter(text, n) {
    if (n < text.length) {
        isTyping = true;
        currentPosition = n;
        document.getElementById("typewriter-end").innerHTML = text.substring(0, n+1) + (text[n] === '\n' ? '<br/>' : '');
        n++;
        typewriterTimeout = setTimeout(function() {
            typeWriter(text, n);
        }, 55);
    } else {
        isTyping = false;
        document.getElementById("caption-2").style.display = 'block'; 
    }
}

const text = "I must say it is unfortunate that I have seen too much of war,\n too much of persecution. I have helped people on many occasions\n because I believe that man must be humane,\nmust be compassionate, must feel concerned.\n<br>I also believe that life is too precious to be spent in hatred.\n Vengeance, I do not like that word.\n I think it is a poisonous word.\n<br>In this life we are interdependent.\n It is a question of give and take. If your neighbor is prosperous,\n it is good for you.<br>\nCertainly, we have our own ways,\nbut people in this world are dependent on each other.";

function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function checkVisibility() {
    const typewriterElement = document.getElementById('typewriter-end');
    if (isElementInView(typewriterElement)) {
        if (!isTyping) {
            typeWriter(text, currentPosition); 
        }
    } else {
        if (isTyping) {
            clearTimeout(typewriterTimeout); 
            isTyping = false;
        }
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 


}
     currentStepIndex = Array.from(steps).indexOf(response.element);
     updateProgressBar(currentStepIndex, steps.length);

})


.onStepExit(response => {
    let step = response.element.dataset.step;

    if (step == "17") {
        document.getElementById("decadeSliderText").style.display = 'none';
        document.getElementById("decadeLabel").style.display = 'none';
        document.getElementById("decadeSlider").style.display = 'none';
        document.getElementById("playButton").style.display = 'none';
        document.getElementById("slider-container").style.display = 'none';

    }

    });


// NAVIGATION BAR
document.getElementById('toggleNav').addEventListener('click', function() {
    var navbar = document.getElementById('navbar');
    if (navbar.classList.contains('nav-open')) {
        navbar.classList.remove('nav-open');
        navbar.classList.add('nav-closed');
    } else {
        navbar.classList.add('nav-open');
        navbar.classList.remove('nav-closed');
    }
});

document.querySelectorAll('#navbar nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const step = link.getAttribute('data-step');
        const element = document.querySelector(`.step[data-step="${step}"]`);
        element.scrollIntoView({ behavior: 'smooth' });

        currentStepIndex = Array.from(steps).indexOf(element);

        updateButtonVisibility();

        document.getElementById('navbar').classList.remove('nav-open');
    });
});


function updateButtonVisibility() {
    upButton.style.visibility = currentStepIndex === 0 ? 'hidden' : 'visible';
    downButton.style.visibility = currentStepIndex === steps.length - 1 ? 'hidden' : 'visible';
}


updateButtonVisibility();

    updateProgressBar(0, steps.length);

    
});
