export interface BeverageType {
    id: number,
    name: string,
    alcoholic: boolean,
    price: number,
    pictureUrl: string
}

export interface Beverage {
    id: number,
    beverageType: BeverageType,
    state: "full" | "empty" | "pending",
}