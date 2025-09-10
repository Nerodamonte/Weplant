CREATE TABLE attachments
(
    attachment_id BIGINT NOT NULL,
    attachmenturl VARCHAR(255),
    project_id    BIGINT,
    CONSTRAINT pk_attachments PRIMARY KEY (attachment_id)
);

CREATE TABLE images
(
    image_id    BIGINT NOT NULL,
    template_id BIGINT,
    image_url   VARCHAR(255),
    CONSTRAINT pk_images PRIMARY KEY (image_id)
);

CREATE TABLE packages
(
    package_id          BIGINT NOT NULL,
    package_name        VARCHAR(255),
    package_description VARCHAR(255),
    package_price       BIGINT,
    CONSTRAINT pk_packages PRIMARY KEY (package_id)
);

CREATE TABLE payments
(
    payment_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    price      BIGINT,
    date       TIMESTAMP WITHOUT TIME ZONE,
    status     VARCHAR(255),
    CONSTRAINT pk_payments PRIMARY KEY (payment_id)
);

CREATE TABLE projects
(
    project_id   BIGINT NOT NULL,
    user_id      BIGINT,
    template_id  BIGINT,
    package_id   BIGINT,
    project_name VARCHAR(255),
    description  VARCHAR(255),
    status       VARCHAR(255),
    create_at    TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_projects PRIMARY KEY (project_id)
);

CREATE TABLE templates
(
    template_id   BIGINT NOT NULL,
    template_name VARCHAR(255),
    description   VARCHAR(255),
    create_at     TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_templates PRIMARY KEY (template_id)
);

CREATE TABLE users
(
    user_id      BIGINT NOT NULL,
    full_name    VARCHAR(255),
    email        VARCHAR(255),
    password     VARCHAR(255),
    phone_number BIGINT,
    role         VARCHAR(255),
    create_at    TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_users PRIMARY KEY (user_id)
);

ALTER TABLE attachments
    ADD CONSTRAINT FK_ATTACHMENTS_ON_PROJECTID FOREIGN KEY (project_id) REFERENCES projects (project_id);

ALTER TABLE images
    ADD CONSTRAINT FK_IMAGES_ON_TEMPLATEID FOREIGN KEY (template_id) REFERENCES templates (template_id);

ALTER TABLE payments
    ADD CONSTRAINT FK_PAYMENTS_ON_PROJECTID FOREIGN KEY (project_id) REFERENCES projects (project_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_PACKAGEID FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_TEMPLATEID FOREIGN KEY (template_id) REFERENCES templates (template_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_USERID FOREIGN KEY (user_id) REFERENCES users (user_id);