"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  Loader2, 
  Filter, 
  Eye, 
  Check, 
  XCircle, 
  ArrowUpRight 
} from "lucide-react";

interface Payment {
  id: number;
  method: string;
  status: string;
  amount: number | string;
  order?: {
    id: number;
    user?: {
      name?: string;
      email?: string;
    };
    createdAt?: string;
  };
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/payments?status=${status}`);

      if (!res.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await res.json();
      setPayments(Array.isArray(data) ? data : data.payments || []);
    } catch (error) {
      console.error("Load payments error:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  async function updatePaymentStatus(id: number, newStatus: string) {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      loadPayments();
    } catch (error) {
      console.error("Update payment error:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  const revenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
          Financial Hub
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <CreditCard className="text-orange-500" size={32} />
          <span>Payment Management 💳</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          Track revenue streams, manage billing lifecycles, and audit payment methods.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Total Payments */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors relative overflow-hidden">
          <div className="absolute right-6 top-6 h-12 w-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500">
            <CreditCard size={22} />
          </div>
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Total Payments</p>
          <h2 className="mt-3 text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {payments.length}
          </h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Recorded transactions</p>
        </div>

        {/* Total Revenue */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors relative overflow-hidden">
          <div className="absolute right-6 top-6 h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-500">
            <DollarSign size={22} />
          </div>
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Total Revenue</p>
          <h2 className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            ${revenue.toFixed(2)}
          </h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Gross volume amount</p>
        </div>

        {/* Paid Payments */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute right-6 top-6 h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-500">
            <CheckCircle2 size={22} />
          </div>
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Paid Payments</p>
          <h2 className="mt-3 text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
            {payments.filter((p) => p.status === "PAID").length}
          </h2>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Successfully cleared</p>
        </div>

      </div>

      {/* Filter Toolbar */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-gray-400"><Filter size={18} /></span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-64 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Showing {payments.length} entries
        </p>
      </div>

      {/* Main Table Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                <th className="py-4 px-6">Payment ID</th>
                <th className="py-4 px-6">Customer Account</th>
                <th className="py-4 px-6">Method</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status Control</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-orange-500 font-bold">
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Loading payments data...</span>
                    </div>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-500 dark:text-gray-400 text-sm font-bold">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    
                    {/* ID */}
                    <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                      #{payment.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 dark:text-white tracking-tight">
                        {payment.order?.user?.name || "Guest / Deleted"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {payment.order?.user?.email || "N/A"}
                      </div>
                    </td>

                    {/* Method */}
                    <td className="py-4 px-6 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">
                      {payment.method || "N/A"}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                      ${Number(payment.amount || 0).toFixed(2)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-6">
                      <div className="relative flex items-center">
                        <select
                          disabled={updatingId === payment.id}
                          value={payment.status}
                          onChange={(e) =>
                            updatePaymentStatus(payment.id, e.target.value)
                          }
                          className={`rounded-xl border px-3.5 py-2 text-xs font-bold uppercase tracking-wider outline-none transition-all cursor-pointer appearance-none pr-8 ${
                            payment.status === "PAID"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
                              : payment.status === "FAILED"
                              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/40"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
                          }`}
                        >
                          <option value="PENDING" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">PENDING</option>
                          <option value="PAID" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">PAID</option>
                          <option value="FAILED" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">FAILED</option>
                        </select>
                        {updatingId === payment.id && (
                          <span className="absolute right-2.5 text-orange-500 pointer-events-none">
                            <Loader2 className="animate-spin" size={14} />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {payment.order?.createdAt
                        ? new Date(payment.order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "PAID")}
                          title="Mark Paid"
                          className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40 hover:bg-emerald-100 transition-all active:scale-95"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          onClick={() => updatePaymentStatus(payment.id, "FAILED")}
                          title="Mark Failed"
                          className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40 hover:bg-rose-100 transition-all active:scale-95"
                        >
                          <XCircle size={16} />
                        </button>

                        {payment.order?.id && (
                          <Link
                            href={`/admin/orders/${payment.order.id}`}
                            title="View Related Order"
                            className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40 hover:bg-blue-100 transition-all active:scale-95"
                          >
                            <ArrowUpRight size={16} />
                          </Link>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}