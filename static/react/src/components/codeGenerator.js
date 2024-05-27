export function generatePythonCode(layers) {
    let code = `import tensorflow as tf\nfrom tensorflow.keras import layers, models\n\nmodel = models.Sequential()\n`;

    layers.forEach(layer => {
        switch (layer.content) {
            case 'Dense Layer':
                code += `model.add(layers.Dense(20, activation='relu'))\n`; // Example properties
                break;
            case 'Dropout Layer':
                code += `model.add(layers.Dropout(0.5))\n`; // Example properties
                break;
            // Add other cases for different layer types
            default:
                break;
        }
    });

    code += `\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\n`;
    code += `model.summary()\n`;

    return code;
}

export function downloadPythonFile(code) {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "model.py";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}