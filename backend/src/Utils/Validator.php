<?php
declare(strict_types=1);

/**
 * Input Validator
 */

class Validator {
    private array $data;
    private array $errors = [];

    public function __construct(array $data) {
        $this->data = $data;
    }

    public function required(string $field, ?string $message = null): self {
        $val = $this->data[$field] ?? null;
        if ($val === null || (is_string($val) && trim($val) === '') || (is_array($val) && count($val) === 0)) {
            $this->addError($field, $message ?? "The {$field} field is required.");
        }
        return $this;
    }

    public function email(string $field, ?string $message = null): self {
        $val = $this->data[$field] ?? null;
        if ($val !== null && trim((string)$val) !== '') {
            if (!filter_var($val, FILTER_VALIDATE_EMAIL)) {
                $this->addError($field, $message ?? "Please provide a valid email address.");
            }
        }
        return $this;
    }

    public function minLength(string $field, int $min, ?string $message = null): self {
        $val = $this->data[$field] ?? '';
        if (mb_strlen((string)$val) < $min) {
            $this->addError($field, $message ?? "Must be at least {$min} characters.");
        }
        return $this;
    }

    public function maxLength(string $field, int $max, ?string $message = null): self {
        $val = $this->data[$field] ?? '';
        if (mb_strlen((string)$val) > $max) {
            $this->addError($field, $message ?? "Cannot exceed {$max} characters.");
        }
        return $this;
    }

    public function slug(string $field, ?string $message = null): self {
        $val = $this->data[$field] ?? null;
        if ($val !== null && !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', (string)$val)) {
            $this->addError($field, $message ?? "Slug must only contain lowercase alphanumeric characters and hyphens.");
        }
        return $this;
    }

    public function in(string $field, array $allowed, ?string $message = null): self {
        $val = $this->data[$field] ?? null;
        if ($val !== null && !in_array($val, $allowed, true)) {
            $allowedList = implode(', ', $allowed);
            $this->addError($field, $message ?? "Must be one of: {$allowedList}.");
        }
        return $this;
    }

    public function addError(string $field, string $message): void {
        if (!isset($this->errors[$field])) {
            $this->errors[$field] = $message;
        }
    }

    public function fails(): bool {
        return count($this->errors) > 0;
    }

    public function getErrors(): array {
        return $this->errors;
    }

    public function getFirstErrorMessage(): string {
        $first = reset($this->errors);
        return $first ?: 'Validation failed.';
    }
}
