import React from "react";
import Layout from "../../Components/Layout/Layout";
import { MapPin, Phone, Mail, User, IdCard, Code } from "lucide-react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const users = [
    {
      img: "https://media.istockphoto.com/id/1206319166/photo/cleaning-time-doesnt-have-to-be-all-boring.webp?a=1&b=1&s=612x612&w=0&k=20&c=X2CvYAXSww5zcgc1jHxaIkGCHPfX7HmfCSZm_vqtvC8=",
      id: 1,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",
      skills: ["React", "Node.js", "UI/UX"],
      gender: "Female",
      verified: true,
      balance: {
        skillToken: 400,
        mainBalance: 200,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-98765432",
          expires: "12/2025",
        },
        {
          type: "National ID",
          id: "NIN-123456789",
          issued: "01/2020",
        },
        {
          type: "Passport",
          id: "PP-987654321",
          expires: "06/2027",
        },
        {
          type: "State ID",
          id: "SID-456789123",
          issued: "03/2022",
        },
      ],
    },
    {
      img: "https://media.istockphoto.com/id/1344781289/photo/profile-of-a-black-man-breathing-fresh-air-in-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=917_GA9-GuH_F4qlyGlixImuWLVyzP7_j4kFWk_6HxA=",
      id: 2,
      fullName: "Michael Smith",
      email: "michael.smith@example.com",
      state: "Texas",
      address: "456 Innovation Drive, Austin",
      phoneNumber: "+1 (555) 987-6543",
      skills: ["JavaScript", "Angular", "TypeScript"],
      gender: "Male",
      verified: false,
      balance: {
        skillToken: 350,
        mainBalance: 150,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-12345678",
          expires: "11/2026",
        },
        {
          type: "National ID",
          id: "NIN-987654321",
          issued: "02/2021",
        },
      ],
    },
    {
      img: "https://media.istockphoto.com/id/1027702326/photo/the-greatest-gift-i-ever-got-was-you.webp?a=1&b=1&s=612x612&w=0&k=20&c=bVDRZyFRHWlfIcV0Puu3liTfXKN-Tc_rSJJJhxV15qI=",
      id: 3,
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      state: "New York",
      address: "789 Startup Blvd, New York",
      phoneNumber: "+1 (555) 246-1357",
      skills: ["Vue.js", "Python", "Flask"],
      gender: "Female",
      verified: true,
      balance: {
        skillToken: 500,
        mainBalance: 250,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-67890123",
          expires: "10/2024",
        },
        {
          type: "National ID",
          id: "NIN-456123789",
          issued: "03/2019",
        },
      ],
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1531384698654-7f6e477ca221?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWZyaWNhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
      fullName: "John Doe",
      email: "john.doe@example.com",
      state: "Florida",
      address: "321 Sunshine St, Miami",
      phoneNumber: "+1 (555) 789-0123",
      skills: ["Java", "Spring Boot", "Docker"],
      gender: "Male",
      verified: true,
      balance: {
        skillToken: 600,
        mainBalance: 300,
      },
      identification: [
        {
          type: "Passport",
          id: "PP-123987654",
          expires: "07/2028",
        },
        {
          type: "State ID",
          id: "SID-654987321",
          issued: "05/2022",
        },
      ],
    },
    {
      id: 5,
      img: "https://media.istockphoto.com/id/931144282/photo/portrait-of-an-african-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=VufeTZ9uAsP4Cc0BGJHwVH1tKm16ZXz3rTpulYmN4AY=",
      fullName: "Sophia Brown",
      email: "sophia.brown@example.com",
      state: "Illinois",
      address: "147 Developer Drive, Chicago",
      phoneNumber: "+1 (555) 369-2581",
      skills: ["React Native", "GraphQL", "Redux"],
      gender: "Female",
      verified: false,
      balance: {
        skillToken: 450,
        mainBalance: 100,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-852741963",
          expires: "08/2027",
        },
      ],
    },
    {
      id: 6,
      fullName: "David Wilson",
      email: "david.wilson@example.com",
      state: "Washington",
      address: "159 Code Valley, Seattle",
      phoneNumber: "+1 (555) 741-9632",
      skills: ["Go", "Kubernetes", "Cloud Computing"],
      gender: "Male",
      verified: true,
      balance: {
        skillToken: 800,
        mainBalance: 400,
      },
      identification: [
        {
          type: "National ID",
          id: "NIN-741852963",
          issued: "01/2018",
        },
        {
          type: "Driver's License",
          id: "DL-963852741",
          expires: "05/2026",
        },
        {
          type: "State ID",
          id: "DL-963852741",
          expires: "05/2026",
        },

        {
          type: "Passport ID",
          id: "DL-963852741",
          expires: "05/2026",
        },
      ],
    },
  ];

  const user = users.find((user) => user.id === parseInt(id));
  console.log(user);

  return (
    <Layout>
      <section className="px-3 pt-4 md:p-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <section className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-3 lg:p-6">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img
                  src={user.img}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={16} />
                  <span>{user.gender}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="lg:w-2/3 space-y-8">
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="text-blue-600" />
                <h2 className="text-xl font-semibold">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Python",
                  "SQL",
                  "AWS",
                  "UI/UX Design",
                  "Project Management",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                Skill Token: ${user.balance.skillToken}
              </button>
              <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
                Main Balance Price: ${user.balance.mainBalance}
              </button>
            </div>

            {/* Identification Documents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <IdCard className="text-blue-600" />
                <h2 className="text-xl font-semibold">Identification</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.identification.map((doc) => (
                  <>
                    <div key={doc.id} className="p-4 border rounded-lg">
                      <h3 className="font-bold">{doc.type}</h3>
                      <p className="text-gray-700">{doc.id}</p>
                      {doc.issued && (
                        <p className="text-gray-500 text-sm">
                          Issued: {doc.issued}
                        </p>
                      )}
                      {doc.expires && (
                        <p className="text-gray-500 text-sm">
                          Expires: {doc.expires}
                        </p>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default OrderDetails;
