export const formatDuration = (duration) => {
  const { secs, nanos } = duration;
  return `${secs}.${Math.floor(nanos / 1000000)}s`;
};

export const formatMemory = (memoryKb) => {
  if (memoryKb >= 1024 * 1024) {
    return `${(memoryKb / (1024 * 1024)).toFixed(2)} GB`;
  }
  if (memoryKb >= 1024) {
    return `${(memoryKb / 1024).toFixed(2)} MB`;
  }
  return `${memoryKb} KB`;
};

export const formatCpuUsage = (cpuPercent) => {
  return `${cpuPercent.toFixed(1)}%`;
};

export const formatDurationShort = (duration) => {
  const totalMs = duration.secs * 1000 + duration.nanos / 1000000;
  if (totalMs < 1000) {
    return `${totalMs.toFixed(0)}ms`;
  }
  return `${(totalMs / 1000).toFixed(1)}s`;
};

// EC2 pricing in USD per hour (based on us-east-1)
const EC2_PRICING = {
  // AMD-based instances
  'c7a.16xlarge': 2.4480,
  'c7a.8xlarge': 1.2240,
  'c7a.4xlarge': 0.6120,
  'c7a.2xlarge': 0.3060,
  'c7a.xlarge': 0.1530,
  'c7a.large': 0.0383,

  // Intel-based instances
  'c7i.16xlarge': 2.7200,
  'c7i.8xlarge': 1.3600,
  'c7i.4xlarge': 0.6800,
  'c7i.2xlarge': 0.3400,
  'c7i.xlarge': 0.1700,
  'c7i.large': 0.0425,

  // Add more instance types as needed
  'r7i.large': 0.168,
  'r7i.xlarge': 0.336,
  'r7i.2xlarge': 0.672,
  'r7i.4xlarge': 1.344,
  'r7i.8xlarge': 2.688,
  'r7i.12xlarge': 4.032,
  'r7i.16xlarge': 5.376,
  'r7i.24xlarge': 8.064,
  'r7i.metal': 8.064,
};

export const calculateEC2Cost = (duration, instanceType) => {
  if (!instanceType || !EC2_PRICING[instanceType]) return null;

  // Convert duration to hours
  const totalNanos = duration.secs * 1000000000 + duration.nanos;
  const hours = totalNanos / (1000000000 * 3600);
  
  // Calculate cost
  const cost = hours * EC2_PRICING[instanceType];
  return cost;
};

export const formatCost = (cost) => {
  if (cost === null || cost === undefined) return 'N/A';
  if (cost < 0.01) {
    return `$${cost.toFixed(5)}`;
  }
  if (cost < 0.1) {
    return `$${cost.toFixed(4)}`;
  }
  return `$${cost.toFixed(3)}`;
}; 