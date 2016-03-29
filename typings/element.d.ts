interface Job {
    amount: number;
    requiredPressure: number;
    materialId: Material;
    requiresPreheat: boolean;
    deadline: Date;
    priority: number;
    client: Client;
    productionTime:
}
