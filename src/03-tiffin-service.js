/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if (typeof name !== "string" || name.trim() === "") return null;
  const rates = {veg: 80, nonveg: 120, jain: 90};

  if (typeof mealType !== "string" ||!(mealType in rates)) return null;
  if (typeof days !== "number" || !Number.isFinite(days) || days <= 0) return null;

  const dailyRate = rates[mealType];
  const totalCost = dailyRate * days;

  return { name, mealType, days, dailyRate, totalCost, };  
}

export function combinePlans(...plans) {
  // Your code here
  if (!plans || plans.length === 0) return null;

  const validPlans = plans.filter((p) => {
    if (!p || typeof p !== "object") return false;

    if (typeof p.name !== "string"|| p.name.trim() === "") return false;
    if (typeof p.mealType !== "string"|| p.mealType.trim() === "") return false;

    if (typeof p.totalCost !== "number" || !Number.isFinite(p.totalCost)) return false;

    return true;
  });
  if (validPlans.length === 0)return null;

  const totalCustomers = validPlans.length;

  const totalRevenue = plans.reduce((sum, plan) =>{
    return sum + plan.totalCost;
  }, 0);

  const mealBreakdown = validPlans.reduce((acc, plan) => {
    const type = plan.mealType;
    acc[type] = (acc[type] || 0) + 1 ;
    return acc;
  }, {});
  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (!plan || typeof plan !== "object") return null;

  const baseRate = plan.dailyRate;
  const days = plan.days;

  if (typeof baseRate !== "number" || !Number.isFinite(baseRate)) return null;
  if (typeof days !== "number" || !Number.isFinite(days) || days <= 0) return null;

  let extraPerDay = 0;
  const addonNames = [];

  for (const addon of addons){
    if (!addon || typeof addon !== "object") continue;

  const addonName = addon.name;
  const price = addon.price;
  
    if (typeof addonName !== "string" || addonName.trim() === "") continue;
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) continue;

    addonNames.push(addonName);
    extraPerDay = extraPerDay + price;
  }
  const dailyRate = baseRate + extraPerDay;
  const totalCost = dailyRate * days;

  return {
    ...plan,
    dailyRate,
    totalCost,
    addonNames,
  };
}
