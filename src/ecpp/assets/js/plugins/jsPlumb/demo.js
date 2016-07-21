jsPlumb.ready(function () {

    // setup some defaults for jsPlumb.
    var instance = jsPlumb.getInstance({
        Endpoint: "Blank",
        // Endpoint: ["Dot", {radius: 2}],
        HoverPaintStyle: {strokeStyle: "#2ec7c9", lineWidth: 1 },
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            } ],
            // [ "Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
        ],
        Container: "statemachine-demo",
    });

    window.jsp = instance;

    var windows = jsPlumb.getSelector(".statemachine-demo .w");

    // initialise draggable elements.
    instance.draggable(windows);

    // bind a click listener to each connection; the connection is deleted. you could of course
    // just do this: jsPlumb.bind("click", jsPlumb.detach), but I wanted to make it clear what was
    // happening.
    instance.bind("click", function (c) {
        instance.detach(c);
    });

    // bind a connection listener. note that the parameter passed to this function contains more than
    // just the new connection - see the documentation for a full list of what is included in 'info'.
    // this listener sets the connection's internal
    // id as the label overlay's text.
    instance.bind("connection", function (info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
    });


    // suspend drawing and initialise.
    instance.batch(function () {
        instance.makeSource(windows, {
            filter: ".ep",
            anchor: "Continuous",
            connector: [ "Flowchart"],
            connectorStyle: { strokeStyle: "#008acd", lineWidth: 1, outlineColor: "transparent", outlineWidth: 4 },
            maxConnections: 5
        });

        // initialise all '.w' elements as connection targets.
        instance.makeTarget(windows, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });

        // and finally, make a couple of connections
        instance.connect({ source: "open1", target: "open2" });
        instance.connect({ source: "open2", target: "open3" });
        instance.connect({ source: "open3", target: "open4" });

    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

});
