"use client";

const navigation = [
  { name: "Cadastro Fatura", href: "/", current: false },
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Biblioteca", href: "/biblioteca_faturas", current: false },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="flex h-16 items-center justify-between max-w-[500px] mx-auto">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={"text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              {item.name}
            </a>
          ))}
       
      </div>
    </nav>
  );
}
