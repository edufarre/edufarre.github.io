# Audio Visualizer - Final Degree Project

The objective of this project, is to implement an online interface that allows users with lack of technical knowledge about computer graphics and audio features to create a scene with different types of objects that will be related with different audio characteristics for a final real time audio visualization. The main goal of this project is to provide to the user an immersive audio-visual experience, making them perceive the media content through more than one sense by rendering in their own scenes the audio data. Minding on the aim of the project, it is explore about possibilities that technology brings us to create web application and relate that audiovisual content which user will be able to share. Those audio visualizations will be defined by setting relations between different nodes using a graph system implementation. Those nodes or boxes affect to the object accordingly to its hierarchy offering to user the possibility of get different results by using few of them.

Find the theorical documentation in the [university repository](https://repositori.upf.edu/handle/10230/32914?locale-attribute=en)

## Deeper look

All this project has been developed from the scratch using Bootstrap interface, without using any implemented template. In 'Info Panel' user also has the chance to download the current graph and load later to keep working or simply sare it with other people.

#### Interface Layout

![Interface Layout](imgs/Layout.png "Audio Visualizer Layout")

Try the web application: [Audio Visualizer](https://edufarre.github.io/)

### Examples

#### Using rotation and surface (as child) nodes

![Simple Rotation Graph](imgs/Rotation.png "Simple Rotation Graph")
![RotationGif](imgs/Hex_gif.gif "RotationGif")

#### Using audio features to change shape size

![Simple Audio Graph](imgs/size.png "Simple Audio Graph")
![SizeGif](imgs/bass_gif.gif "SizeGif")

#### Possible Final Visualization

![Possible Result](imgs/finalResult.gif "One possible result using this interface")

## Known Issues

* Not following the properly order of applying relations when loading a previously created graph (JSON file)

## Future improvements

* Need to define 'Full Screen' button
* Possibility of attaching a video as a background
* Improvements of Image and Color nodes (lreations graph)
* Give a bigger range of possible actions when rendering the points

## Built With / Used

* [Bootstrap](https://getbootstrap.com/) -  Open source toolkit for developing with HTML, CSS, and JS

* [Canvas](https://developer.mozilla.org/ca/docs/Web/API/Canvas_API) - *Element used to draw graphics via scripting in JavaScript.*
* [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - *Powerful and versatile system for controlling audio on the Web.*
* [Litegraph.js](https://github.com/jagenjo/litegraph.js) - *A graph node editor similar to PureData or UDK Blueprints, it works in a HTML5 Canvas and allow to exported graphs to be included in applications.*
* [glMatrix](http://glmatrix.net/) - *Javascript Matrix and Vector library for High Performance WebGL apps. This types of applications demand high performance vector and matrix math, which is something that Javascript doesn't provide by default.*

## Author & Tutor

* **Eduard Farré Puig** - *Author*
* **Javi Agenjo** - *Tutor* - [GitHub](https://github.com/jagenjo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/edufarre/edufarre.github.io/blob/master/LICENSE) file for details

## Acknowledgments

* Thanks to my tutor who supported my during all the process and helped me with this personal project.
* Inspiration: Mix all the audio concepts knowledge learnt during my degree with one of the most used technologies, web applications, using HTML, JavaScript and CSS programming langauges.

