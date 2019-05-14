#include <SocketIOClient.h>

const char* ssid = "Fiwi";
const char* password = "khongbietdau";

// Server Ip
String host = "192.168.0.105";
// Server port
int port = 3000;

SocketIOClient socket;

bool status;

void setupNetwork() {
    WiFi.begin(ssid, password);
    uint8_t i = 0;
    while (WiFi.status() != WL_CONNECTED && i++ < 20) delay(500);
    if (i == 21) {
        Serial.println("Can not connect wifi!");
        while (1) delay(500);
    }

    Serial.println("Wifi connected!");
}

void sendInfo()
{
  int r = rand() % (65 + 1 - 0) + 0;

   String emitString = "{\"random\":";
   emitString += r;
   emitString += "}";

  Serial.print("random: ");
  Serial.println(r);

  socket.emit("send_info", emitString);
  delay(1000);
}

void saveInfo()
{
    int r = rand() % (65 + 1 - 0) + 0;

   String saveString = "{\"random\":";
   saveString += r;
   saveString += "}";

   Serial.print("random: ");
   Serial.println(r);

   socket.emit("save_info", saveString);
   delay(20000);
}

//void response()
//{
//   String res = "{\"thanhcong\"!";
//   res += "}";
//
//    return res;
//}

void mbom(String data)
{
  Serial.println(data);

  if (data == "[\"mbom\",\"on\"]") {
     status = true;
     Serial.println(status);
     socket.emit("res", "{\"status\":\"on success\"}");
  } else {
    status = false;
    Serial.println(status);
    socket.emit("res", "{\"status\":\"off success\"}");
  }

}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  setupNetwork();
  socket.on("mbom", mbom);
  socket.connect(host, port);
}

void loop() {
  // put your main code here, to run repeatedly:
   socket.monitor();
   sendInfo();
//   saveInfo();
}
