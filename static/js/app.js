
// create a function that will be called whenever an id is selected in the drop down menu
// read json file
function data(){
    d3.json("../samples.json").then(function(data) {
        // For every individual, find the top ten OTUs.
        // Do this by sorting the sample_values in descending order
            
            console.log("This my array of samples", data.samples);
            const samples = data.samples.sort((lesserOTU, greaterOTU) => greaterOTU.sample_values - lesserOTU.sample_values);
            console.log("The array of sorted samples", samples);
        
        // Slice the top ten sample values from each person
            // const topOTUs = [];
            // // const topOTU_ids = [];
        
            // samples.forEach(element => {
            //     topOTUs.push(element.sample_values.slice(0,10));
            //     topOTUs.push(element.otu_ids.slice(0,10));
            // });
            // console.log(topOTUs);
            // samples.forEach(element => {
            //     topOTU_ids.push(element.otu_ids.slice(0,10));
            // });
            // console.log(topOTU_ids);
        
        // create plot for every persons result
            // const trace = {
            //     x: topOTUs.map(otu => otu),
            //     y: topOTU_ids.map(otu => otu),
            //     type: 'bar',
            //     orientation: 'h'
            // };
        
            // Plotly.newPlot('bar', [trace]);
        });        
}


// Next create a drop down menu that will store each object id
// d3.select('#selDataset').on('change', () => {
//     data(d3.event.taget.value);
// });



// Next plot sample values vs 