export type JsonLdPayload = Record<string, unknown> | Array<Record<string, unknown>>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseJsonLd(value: string | null | undefined): JsonLdPayload | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (isObject(parsed)) {
      return parsed;
    }

    if (Array.isArray(parsed) && parsed.every((item) => isObject(item))) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function getJsonLdScriptPayload(
  ...values: Array<string | null | undefined>
): JsonLdPayload[] {
  return values.flatMap((value) => {
    const parsed = parseJsonLd(value);
    return parsed ? [parsed] : [];
  });
}
