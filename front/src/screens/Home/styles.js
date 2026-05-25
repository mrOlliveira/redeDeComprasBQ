export const styles = {
  tabContainer: "flex flex-wrap gap-2 bg-[#111827]/40 backdrop-blur-md p-1 rounded-xl border border-white/5",
  tabButtonActive: "px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all duration-200 cursor-pointer",
  tabButtonInactive: "px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs rounded-lg transition-all duration-200 cursor-pointer",
  
  gridTitle: "text-lg font-semibold text-white flex items-center gap-2 m-0",
  legendContainer: "flex flex-wrap gap-3 text-[11px] font-medium text-slate-400 bg-[#030712]/30 p-2 rounded-lg border border-white/5",
  legendItem: "flex items-center gap-1.5",

  // Define uma grade de EXATAMENTE 5 colunas por onde os armários vão quebrar uniformemente
  matrixGrid: "grid grid-cols-5 gap-2.5 w-full max-w-md mx-auto aspect-[5/6]",
  
  // Customização compacta do botão do armário para encaixar verticalmente sem transbordar
  lockerBase: "w-full aspect-square rounded-lg flex flex-col items-center justify-center border p-1 font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer relative",
  
  sidebarContainer: "bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl h-full flex flex-col gap-4",
  sidebarTitle: "text-base font-bold text-white border-b border-white/5 pb-2 m-0",
  detailRow: "flex justify-between items-center bg-[#030712]/40 border border-white/5 p-3 rounded-xl text-xs",
  detailLabel: "text-slate-400 font-medium",
  detailValue: "text-white font-semibold",
  
  btnActionPrimary: "w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold rounded-xl shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-150 cursor-pointer"
};

export const getLockerStyles = (status, isSelected) => {
  if (isSelected) {
    return "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] scale-[1.02] z-10";
  }
  
  switch(status) {
    case 0:
      return "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50";
    case 1:
      return "border-rose-500/20 bg-rose-500/5 text-rose-400/40 cursor-not-allowed opacity-50";
    case 2:
      return "border-amber-500/20 bg-amber-500/5 text-amber-400 opacity-40 cursor-not-allowed";
    default:
      return "border-white/10 bg-white/5 text-white";
  }
};