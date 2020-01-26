// create a function that will be called whenever an id is selected in the drop down menu
// read json file
function id(selectedID){
    
    d3.json("../samples.json").then(function(jsonData){
        console.log(jsonData);
        
        // read person id for dropdown menu
        const names = jsonData.names;
        console.log(names);

        d3.select('#selDataset').html();
        Array.from(names).forEach( item => {
            d3.select('#selDataset').append('option').attr('value', item).text(item);
        });
        d3.select('#selDataset').node().value = selectedID;

        // Find otu_ids and sample_values once an id is selected from the drop down menu
        // This can be done by filtering the sample data based on the id selected
        console.log("Samples", jsonData.samples);
        const filtData = jsonData.samples.filter( item => item.id === selectedID);
        console.log("Filtered Sample Data", filtData);


        // Once the sample id has been filtered, sort the values in descending order

        const sortVal = filtData.map(item => item.sample_values.sort((lesserOTU, greaterOTU) => greaterOTU.sample_values - lesserOTU.sample_values));
        
        console.log("All Sorted Values", sortVal)
        
        // Slice the sorted values array to obtain the top ten sample values
        for (let [key, value] of sortVal.entries()) {
            slicedVal = value.slice(0,10)};
        
        
        // Obtain the otu_ids associated with the top ten values
        const sortOTUids = filtData.map(item => item.otu_ids);

        console.log("All Sorted IDs", sortOTUids)

        console.log(sortOTUids[0]);
        // Slice the otu_ids array to obtain the otu_ids associated with the top ten values
        for (let [key, value] of sortOTUids.entries()) {
            slicedOTUids = value.slice(0,10)};
        
        // To ensure a catagorical plot along the y axis, attach 'OTU' to each otu_id value
        let otuIDs = slicedOTUids.map(item => {
            return `OTU ${item}`
        });

        console.log("Sliced IDs", otuIDs);
        

        console.log("Sliced Values", slicedVal);

        // Reverse Order so that Largest Value is on top
        const revOtuIDS = otuIDs.reverse();
        const revSlicedVal = slicedVal.reverse();


        // Generate a bar plot to show the top ten sample values
        const trace1 = {
            x: revSlicedVal,
            y: revOtuIDS,
            type: 'bar',
            orientation: 'h'
        };

        const layout1 = {
            showticklabels: true
        };

        // Generate a bubble plot for all sample values
        const trace2 = {
            x: sortOTUids[0],
            y: sortVal[0],
            mode: 'markers',
            marker: {
                color: sortOTUids[0],
                size: sortVal[0]
            }
        };




        
        Plotly.newPlot('bar', [trace1], layout1);
        Plotly.newPlot('bubble', [trace2]);



        // Find Demographics for each person in the study

        // Filter the metadata find only the id that matches the id in the drop down menu
        console.log("MetaData", jsonData.metadata);
        const filtMetaData = jsonData.metadata.filter( item => item.id == selectedID);
        console.log("Filtered MetaData", filtMetaData);

        // console.log(filtMetaData[0]);
        // d3.select('#sample-metadata').html();
        // for (let [key, value] of Object.entries(filtMetaData[0])) {
        //     d3.select('#sample-metadata').append('li').attr('value',);
        //     console.log(`${key}: ${value}`);
        // }

        filtMetaObj = filtMetaData[0]
        console.log(filtMetaObj);

        Object.entries(filtMetaObj).forEach( item => {
            d3.select('#sample-metadata').append('li').attr('value', item).text(item);
        });

        // Object.entries(filtMetaObj).forEach(([key, value]) => {
        //     d3.select('#sample-metadata').append('li').attr('key', key).text(key).attr('value', value).text(value);
        // });



    }); 
};

id('940');


d3.select('#selDataset').on('change', id);
