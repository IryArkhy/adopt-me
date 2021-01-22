
const Pet = ({name, animal, breed}) => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, name),
            React.createElement("h2", {}, animal),
            React.createElement("h2", {}, breed)
        ]
            )
        };

const App = () => {
            return React.createElement(
                "div",
                {label: 'hello'},
                [
                    React.createElement("h1", {}, "Adopt Me!"),
                    React.createElement(Pet, {name: "Luna", animal: "Dog", breed: "Havanese"}),
                    React.createElement(Pet, {name: "Pepper", animal: "Dog", breed: "Cockatiel"}),
                    React.createElement(Pet, {name: "Doink", animal: "Cat", breed: "Mixed"}),
                ]
            )
        };

        // Эта функция стирает все, что внутри div#rooot
ReactDOM.render(React.createElement(App), document.getElementById("root"));
