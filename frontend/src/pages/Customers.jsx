import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Plus, IndianRupee, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Tumhara Backend URL
const API_URL = 'shop-dashboard-pi.vercel.app/api/customers';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
  
  // Payment receive karne ke liye state
  const [paymentInput, setPaymentInput] = useState({}); 

  // Backend se saare customers mangwana
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Customers fetch karne me error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Naya khata (Customer) add karna
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add`, newCustomer);
      alert("✅ Naya khata successfully khul gaya!");
      setNewCustomer({ name: '', phone: '' }); // Form clear
      fetchCustomers(); // Table update
    } catch (error) {
      alert("❌ Error aayi. Shayad is number se khata pehle se hai.");
    }
  };

  // Udhaar Jama (Receive) karna
  const handleReceivePayment = async (id, name) => {
    const amount = paymentInput[id];
    if (!amount || amount <= 0) {
      alert("Sahi amount daaliye!");
      return;
    }

    try {
      await axios.put(`${API_URL}/receive-payment/${id}`, { amountReceived: Number(amount) });
      alert(`✅ ${name} ke khate se ₹${amount} jama ho gaye!`);
      
      // Input clear karo aur table update karo
      setPaymentInput({ ...paymentInput, [id]: '' });
      fetchCustomers();
    } catch (error) {
      alert("❌ Payment update karne me error aayi.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-brand-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">Udhaar Khata (Customers)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Naya Customer Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserCheck size={20} className="text-brand-500" /> Naya Khata Kholein
          </h3>
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Grahak Ka Naam</label>
              <input 
                required type="text" placeholder="e.g., Ramesh Babu" 
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
              <input 
                required type="text" placeholder="10 digit number" maxLength="10"
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md mt-2">
              Khata Save Karein
            </button>
          </form>
        </div>

        {/* Khata List (Table) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Sabhi Grahak</h3>
          </div>
          
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-sm border-b border-gray-100 sticky top-0">
                  <th className="p-4 font-semibold">Naam & Number</th>
                  <th className="p-4 font-semibold">Baaki Udhaar</th>
                  <th className="p-4 font-semibold text-right">Paise Jama Karein</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="text-center p-6 text-gray-500">Loading data...</td></tr>
                ) : customers.length === 0 ? (
                  <tr><td colSpan="3" className="text-center p-6 text-gray-500">Abhi koi khata nahi khula hai!</td></tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${customer.udhaarBalance > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                          ₹ {customer.udhaarBalance}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        {/* Jama karne ka input aur button */}
                        <input 
                          type="number" placeholder="₹ Amount" 
                          className="w-24 p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-500"
                          value={paymentInput[customer._id] || ''} 
                          onChange={(e) => setPaymentInput({...paymentInput, [customer._id]: e.target.value})}
                        />
                        <button 
                          onClick={() => handleReceivePayment(customer._id, customer.name)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg font-bold flex items-center shadow-sm"
                          title="Jama Karein"
                        >
                          <IndianRupee size={16} /> Jama
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Customers;
