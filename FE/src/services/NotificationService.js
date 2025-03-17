import * as signalR from "@microsoft/signalr";

class NotificationService {
  constructor() {
    this.connection = null;
    this.isConnecting = false; // Tránh gọi startConnection nhiều lần
    this.listeners = [];
    this.setupConnection();
  }

  setupConnection() {
    if (this.connection) {
      this.connection.stop().catch((err) => console.error("Error stopping connection:", err));
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7134/notificationHub", {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on("ReceiveNotification", (notification) => {
      console.log("📩 Received notification:", notification);
      this.notifyListeners(notification);
    });

    this.connection.onclose(() => {
      console.log("❌ SignalR connection closed.");
      this.isConnecting = false; // Reset flag khi mất kết nối
    });
  }

  async startConnection() {
    if (!this.connection) this.setupConnection();

    if (
      this.isConnecting || // Đang kết nối
      this.connection.state === signalR.HubConnectionState.Connected || // Đã kết nối
      this.connection.state === signalR.HubConnectionState.Connecting || // Đang kết nối
      this.connection.state === signalR.HubConnectionState.Reconnecting // Đang kết nối lại
    ) {
      return;
    }

    this.isConnecting = true;

    try {
      await this.connection.start();
      console.log("✅ SignalR Connected.");
    } catch (error) {
      console.error("🚨 SignalR connection error:", error);
      setTimeout(() => this.startConnection(), 5000); // Thử kết nối lại sau 5 giây
    } finally {
      this.isConnecting = false; // Reset flag sau khi kết nối xong
    }
  }

  stopConnection() {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return this.connection.stop();
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  notifyListeners(notification) {
    this.listeners.forEach((listener) => listener(notification));
  }
}

const notificationService = new NotificationService();
export default notificationService;
