# Simple chatbot implementation with PyTorch.

### Clone repo and create a virtual environment:
```
$ git clone https://github.com/kishxnpatel/chatbot-deployment.git
$ cd chatbot-deployment
$ python3 -m venv venv //ForWindows - 'pip install virtualenv'
$ . venv/bin/activate  //ForWindows - venv/Scripts/activate
```
Install PyTorch and Dependencies:
```
$ (venv) pip install Flask torch torchvision nltk
```
You also need to Install the Natural Language Toolkit packages:
```
pip install nltk
```
Then import the `nltk` packages into your project and you also need to install `nltk.tokenize.Punkt`.
```
$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
```
Customize
Have a look at `intents.json`. You can customize it according to your own use case. Just define a new tag, possible patterns, and possible responses for the chatbot. You have to re-run the training whenever this file is modified.
```
{
  "intents": [
    {
      "tag": "greeting",
      "patterns": [
        "Hi",
        "Hey",
        "How are you",
        "Is anyone there?",
        "Hello",
        "Good day"
      ],
      "responses": [
        "Hey :-)",
        "Hello, thanks for visiting",
        "Hi there, what can I do for you?",
        "Hi there, how can I help?"
      ]
    },
    ...
  ]
}
```
Usage
Run the `train.py` file to train your chatbot.
```
python train.py
```
This will dump `data.pth` file. And then run the following command to test it in the console. 
```
python chat.py
```
# Now, for Deployment 
As you already have the `Html` / `CSS` / and `app.js` file or better else you can create your own desired framework.

Next, to run this as a template, not in Flask you need to Install Flask_cors packages
```
pip install flask_cors
```
Following, Open `app.py` and import Flask, Flask_cors, and the get_response function.

```
from flask import Flask, render_template, request, request, jsonif
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict();

text = request.get_json().get("message")
# TODO: Chack if text is valid
response = get_response(text)
message = {"answer": response}
return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
 
 ```
 
 Adding to this, open the `App.Js` file and add scripts that will work in sending and receiving requests for text.
 
 ```
class Chatbox 
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        this.state = false;
        this.messages = [];
    }
    display() {
        const {openButton, chatBox, sendButton} = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }
    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}
const chatbox = new Chatbox();
chatbox.display();
```
Finally, if everything works great your chatbot is ready to chat 
