import Header from "./components/Header";
import Card from "./components/Card";
import "./index.css";

function App() {
  const dataMahasiswa = [
    {
      nama: "Ardhan",
      deskripsi:
        "Mahasiswa Teknik Elektro yang tertarik pada sistem kendali dan teknologi industri.",
      icon: "⚡",
    },
    {
      nama: "Teknik Kendali",
      deskripsi:
        "Mempelajari  PID, mikrokontroler, IoT, mekatronika, dan robotika.",
      icon: "⚙️",
    },
    {
      nama: "React Project",
      deskripsi:
        "Project sederhana untuk menerapkan komponen, props, dan useState pada React.",
      icon: "💻",
    },
  ];

  return (
    <div className="app">
      <Header
        judul="Profil & Project Mahasiswa"
        subjudul="Tugas Pemrograman React"
      />

      <main className="container">
        <h2>Daftar Project</h2>

        <div className="card-container">
          {dataMahasiswa.map((item) => (
            <Card
              key={item.nama}
              nama={item.nama}
              deskripsi={item.deskripsi}
              icon={item.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;